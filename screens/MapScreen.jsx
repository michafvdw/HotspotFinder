import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { AppContext } from '../context/AppContext';


const MapScreen = ({ route }) => {
  const { hotspots, darkMode } = useContext(AppContext);
  const [region, setRegion] = useState({
    latitude: 51.9225,
    longitude: 4.47917,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (route.params?.hotspot) {
      setRegion({
        ...route.params.hotspot.coordinates,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [route.params]);

  return (
    <MapView 
      style={tw`flex-1`}
      region={region}
      showsUserLocation
      showsMyLocationButton
    >
      {hotspots.map((hotspot) => (
        <Marker
          key={hotspot.id}
          coordinate={hotspot.coordinates}
          title={hotspot.name}
          description={hotspot.category}
        />
      ))}
    </MapView>
  );
};

export default MapScreen;
