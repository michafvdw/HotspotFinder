import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import HotspotList from '../components/HotspotList';
import { AppContext } from '../context/AppContext';

const HomeScreen = () => {
  const { layoutMode, darkMode, setHotspots, hotspots } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="restaurant"](51.85,4.25,51.95,4.45);
          way["amenity"="restaurant"](51.85,4.25,51.95,4.45);
          relation["amenity"="restaurant"](51.85,4.25,51.95,4.45);
        );
        out center;
      `;
      const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);

      try {
        const response = await fetch(url);
        const json = await response.json();

        const data = json.elements.map(el => ({
          id: el.id,
          name: el.tags?.name || 'Naam onbekend',
          category: el.tags?.amenity || 'restaurant',
          coordinates: el.type === 'node' 
            ? { latitude: el.lat, longitude: el.lon }
            : { latitude: el.center.lat, longitude: el.center.lon }
        }));

        setHotspots(data);
      } catch (err) {
        console.error('Fout bij ophalen data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [setHotspots]);

  const handleSelect = (item) => {
    navigation.navigate('Map', { hotspot: item });
  };

  return (
    <View style={tw`flex-1 p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
          Restaurants in Rotterdam
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={tw`bg-blue-600 px-4 py-2 rounded mb-2`}
        >
          <Text style={tw`text-white text-center`}>⚙️ Instellingen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Favorites')}
          style={tw`bg-red-600 px-4 py-2 rounded`}
        >
          <Text style={tw`text-white text-center`}>❤️ Favorieten</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <HotspotList 
          data={hotspots} 
          layoutMode={layoutMode}
          onSelect={handleSelect}
        />
      )}
    </View>
  );
};

export default HomeScreen;
