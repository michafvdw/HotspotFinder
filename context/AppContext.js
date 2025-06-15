import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [layoutMode, setLayoutMode] = useState('list');
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [notes, setNotes] = useState({});
  const [hotspots, setHotspots] = useState([]); // Altijd een array

  // Laad data uit AsyncStorage bij opstarten
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
      } catch (e) {
        console.error('Fout bij laden van AsyncStorage data', e);
      }
    };
    loadData();
  }, []);

  // Update layout mode en sla op
  const updateLayout = async (mode) => {
    setLayoutMode(mode);
    await AsyncStorage.setItem('layoutMode', mode);
  };

  // Toggle dark mode en sla op
  const toggleDarkMode = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await AsyncStorage.setItem('darkMode', newMode.toString());
  };

  // Toggle favoriet status en sla op
  const toggleFavorite = async (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(fId => fId !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Sla notitie op per hotspot id
  const saveNote = async (id, text) => {
    const newNotes = { ...notes, [id]: text };
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  };

  return (
    <AppContext.Provider value={{
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
    }}>
      {children}
    </AppContext.Provider>
  );
};
