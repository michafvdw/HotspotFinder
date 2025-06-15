import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AppProvider } from '/Users/micha/HotspotFinder/context/AppContext.js'; // juiste pad naar je context
import FavoritesScreen from '/Users/micha/HotspotFinder/screens/FavoriteScreen.jsx';
import HomeScreen from '/Users/micha/HotspotFinder/screens/HomeScreen.jsx';
import MapScreen from '/Users/micha/HotspotFinder/screens/MapScreen.jsx';
import SettingsScreen from '/Users/micha/HotspotFinder/screens/SettingsScreen.jsx';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <AppProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </AppProvider>
  );
}
