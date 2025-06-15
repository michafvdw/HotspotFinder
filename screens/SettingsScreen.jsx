import React, { useContext } from 'react';
import { ScrollView, Switch, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { AppContext } from '../context/AppContext';

const SettingsScreen = () => {
  const { layoutMode, updateLayout, darkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <ScrollView style={tw`flex-1 p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Text style={tw`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>Instellingen</Text>
      
      <View style={tw`bg-white p-4 rounded-lg shadow-sm mb-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-lg`}>Grid weergave</Text>
          <Switch
            value={layoutMode === 'grid'}
            onValueChange={(value) => updateLayout(value ? 'grid' : 'list')}
          />
        </View>
      </View>

      <View style={tw`bg-white p-4 rounded-lg shadow-sm`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-lg`}>Donkere modus</Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
