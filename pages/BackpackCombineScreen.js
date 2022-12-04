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
const BackpackCombineScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1">
      <Navbar navigation={navigation} />
      <View className="flex items-center justify-center py-10">
        <View>
          <Text className="font-extrabold text-lg">Combine</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BackpackCombineScreen;
