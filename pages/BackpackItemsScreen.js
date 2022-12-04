import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import ListItem from '../src/components/BackpackPages/Items/ListItem';
import Navbar from '../src/components/Navbar';
const BackpackItemsScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1">
      <Navbar navigation={navigation} />
      <View className="flex items-center justify-center py-10">
        <View>
          <Text className="font-extrabold text-lg">My Items</Text>
        </View>
      </View>
      <ListItem />
    </SafeAreaView>
  );
};

export default BackpackItemsScreen;
