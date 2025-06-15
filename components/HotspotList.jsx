import React from 'react';
import { FlatList, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import HotspotCard from './HotspotCard';

const HotspotList = ({ data, layoutMode, onSelect }) => {
  return (
    <FlatList
      data={data}
      key={layoutMode} // Forceer herrender bij layout wijziging
      keyExtractor={(item) => item.id.toString()}
      numColumns={layoutMode === 'grid' ? 2 : 1}
      contentContainerStyle={tw`pb-4`}
      renderItem={({ item }) => (
        <View style={layoutMode === 'grid' ? tw`w-1/2 p-2` : tw`w-full p-2`}>
          <HotspotCard 
            item={item}
            layoutMode={layoutMode}
            onPress={() => onSelect(item)}
          />
        </View>
      )}
    />
  );
};

export default HotspotList;
