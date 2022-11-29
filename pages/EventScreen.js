import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  useColorScheme,
} from 'react-native';
import Navbar from '../src/components/Navbar';
const EventScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1">
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

export default EventScreen;
