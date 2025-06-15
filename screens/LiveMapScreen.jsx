import * as Location from 'expo-location';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { AppContext } from '../context/AppContext';

const LiveMapScreen = () => {
  const { hotspots, darkMode } = useContext(AppContext);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredHotspots, setFilteredHotspots] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Locatietoestemming geweigerd');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    const results = hotspots.filter((h) =>
      h.name.toLowerCase().includes(query)
    );
    setFilteredHotspots(results);
  }, [search, hotspots]);

  const centerOnHotspot = (spot) => {
    Keyboard.dismiss();
    mapRef.current.animateToRegion({
      latitude: spot.coordinates.latitude,
      longitude: spot.coordinates.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 600);
  };

  if (!location) {
    return (
      <View style={tw`flex-1 justify-center items-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {errorMsg ? (
          <Text style={tw`${darkMode ? 'text-white' : 'text-black'}`}>{errorMsg}</Text>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        {hotspots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={spot.coordinates}
            title={spot.name}
            description={spot.category}
            pinColor="red"
          />
        ))}
      </MapView>

      {/* Search input and list */}
      <View style={tw`absolute top-6 left-4 right-4`}>
        <TextInput
          placeholder="Zoek restaurant..."
          placeholderTextColor={darkMode ? '#ccc' : '#888'}
          style={tw`bg-white rounded px-4 py-2 shadow ${darkMode ? 'bg-gray-800 text-white' : 'text-black'}`}
          value={search}
          onChangeText={setSearch}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

        {/* Filtered List */}
        {search.length > 0 && (
          <FlatList
            data={filteredHotspots}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => centerOnHotspot(item)}
                style={tw`p-2 border-b border-gray-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <Text style={tw`${darkMode ? 'text-white' : 'text-black'}`}>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={{ maxHeight: 200 }}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>
    </View>
  );
};

export default LiveMapScreen;


