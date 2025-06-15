import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { AppContext } from '../context/AppContext';

const HotspotCard = ({ item, layoutMode, onPress }) => {
  const { favorites, toggleFavorite, notes } = useContext(AppContext);
  
  return (
    <TouchableOpacity
      style={tw`bg-white rounded-lg p-4 ${
        layoutMode === 'grid' ? 'h-40' : 'h-24'
      } shadow-sm`}
      onPress={onPress}
    >
      <View style={tw`flex-row justify-between items-start`}>
        <Text 
          style={tw`font-bold ${layoutMode === 'grid' ? 'text-lg' : 'text-base'}`}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Text style={tw`text-2xl`}>
            {favorites.includes(item.id) ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text 
        style={tw`text-gray-600 ${layoutMode === 'grid' ? 'text-sm mt-2' : 'text-xs mt-1'}`}
        numberOfLines={layoutMode === 'grid' ? 2 : 1}
      >
        {item.description}
      </Text>

      {notes[item.id] && (
        <Text style={tw`text-xs text-blue-600 mt-1`} numberOfLines={1}>
          📝 {notes[item.id]}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default HotspotCard;
