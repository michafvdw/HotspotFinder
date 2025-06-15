import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AppProvider } from '../context/AppContext'; // Pas aan naar jouw projectstructuur
import FavoritesScreen from '../screens/FavoriteScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';

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

