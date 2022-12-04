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
import ListPokemon from '../src/components/BackpackPages/Pokemon/ListPokemon';
import Navbar from '../src/components/Navbar';
const BackpackPokemonScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1">
      <Navbar navigation={navigation} />
      <View className="flex items-center justify-center py-10">
        <View>
          <Text className="font-extrabold text-lg">My Pokemon</Text>
        </View>
      </View>
      <ListPokemon navigation={navigation} />
    </SafeAreaView>
  );
};

export default BackpackPokemonScreen;
