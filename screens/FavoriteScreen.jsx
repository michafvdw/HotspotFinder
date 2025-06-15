import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { AppContext } from '../context/AppContext';

const FavoritesScreen = () => {
  const { favorites, hotspots, notes, toggleFavorite, saveNote, darkMode } = useContext(AppContext);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [favoriteHotspots, setFavoriteHotspots] = useState([]);

  // Update favoriteHotspots als favorites of hotspots veranderen
  useEffect(() => {
    // Filter hotspots die in favorites staan
    const favs = hotspots.filter(h => favorites.includes(h.id));
    setFavoriteHotspots(favs);
  }, [favorites, hotspots]);

  const startEditing = (id) => {
    setEditingNoteId(id);
    setNoteText(notes[id] || '');
  };

  const saveCurrentNote = () => {
    if (editingNoteId !== null) {
      saveNote(editingNoteId, noteText);
      setEditingNoteId(null);
      setNoteText('');
    }
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <View style={tw`p-4 mb-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <View style={tw`flex-row justify-between items-center mb-2`}>
          <Text style={tw`${darkMode ? 'text-white' : 'text-black'} text-lg font-semibold`}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Text style={tw`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
              {isFavorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        {editingNoteId === item.id ? (
          <>
            <TextInput
              style={tw`border border-gray-400 rounded p-2 mb-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              multiline
              value={noteText}
              onChangeText={setNoteText}
              placeholder="Voeg een notitie toe..."
              placeholderTextColor={darkMode ? '#ccc' : '#666'}
            />
            <TouchableOpacity
              style={tw`bg-blue-600 rounded p-2`}
              onPress={saveCurrentNote}
            >
              <Text style={tw`text-white text-center`}>Opslaan</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => startEditing(item.id)}>
            <Text style={tw`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {notes[item.id] ? notes[item.id] : 'Voeg een notitie toe'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (favoriteHotspots.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <Text style={tw`${darkMode ? 'text-white' : 'text-black'}`}>Je hebt nog geen favorieten.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={tw`flex-1 p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
      data={favoriteHotspots}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default FavoritesScreen;
