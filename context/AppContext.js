import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [layoutMode, setLayoutMode] = useState('list');
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [notes, setNotes] = useState({});
  const [hotspots, setHotspots] = useState([]);  // <-- Zorg dat deze state bestaat

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedLayout = await AsyncStorage.getItem('layoutMode');
        if (savedLayout) setLayoutMode(savedLayout);

        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        if (savedDarkMode !== null) setDarkMode(savedDarkMode === 'true');

        const savedFavorites = await AsyncStorage.getItem('favorites');
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes) setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error('Fout bij laden van AsyncStorage data:', error);
      }
    };
    loadData();
  }, []);

  const updateLayout = useCallback(async (mode) => {
    setLayoutMode(mode);
    await AsyncStorage.setItem('layoutMode', mode);
  }, []);

  const toggleDarkMode = useCallback(async () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      AsyncStorage.setItem('darkMode', newMode.toString()).catch(console.error);
      return newMode;
    });
  }, []);

  const toggleFavorite = useCallback(async (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter(fId => fId !== id)
        : [...prevFavorites, id];
      AsyncStorage.setItem('favorites', JSON.stringify(newFavorites)).catch(console.error);
      return newFavorites;
    });
  }, []);

  const saveNote = useCallback(async (id, text) => {
    setNotes((prevNotes) => {
      const newNotes = { ...prevNotes, [id]: text };
      AsyncStorage.setItem('notes', JSON.stringify(newNotes)).catch(console.error);
      return newNotes;
    });
  }, []);

  // Context value memoriseren
  const contextValue = useMemo(() => ({
    layoutMode,
    updateLayout,
    darkMode,
    toggleDarkMode,
    favorites,
    toggleFavorite,
    notes,
    saveNote,
    hotspots,      // <-- Voeg hotspots toe aan context
    setHotspots,   // <-- Voeg setHotspots toe aan context
  }), [
    layoutMode,
    updateLayout,
    darkMode,
    toggleDarkMode,
    favorites,
    toggleFavorite,
    notes,
    saveNote,
    hotspots,
    setHotspots,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
