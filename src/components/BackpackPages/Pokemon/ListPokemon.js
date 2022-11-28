import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Pressable,
  Text,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {VStack, Stack, Skeleton} from 'native-base';
import {getPokemonElementType} from 'constant-pokechain';

import styles from '../../../stylesheet/BackpackScreen/module_backpack_pokemon_styles';
import {useAxios} from '../../../utils/axiosInstance';
import {useQuery} from 'react-query';
import {getBackpackPokemon} from '../schema/query';
import {SizedBox} from 'sizedbox';
import LinearGradient from 'react-native-linear-gradient';
import {capitalizeFirstLetter} from '../../../utils/constant';
const ListPokemon = ({navigation}) => {
  const axiosInstance = useAxios();
  const {
    data: listPokemon,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: 'listBackpackPokemon',
    queryFn: () => getBackpackPokemon(axiosInstance),
    refetchRetry: 3,
  });
  if (isError) {
    refetch();
  }
  return (
    <ScrollView style={styles.container}>
      {!isLoading ? (
        <ScrollView>
          {listPokemon?.my_pokemons.map((item, index) => (
            <Stack direction="column" mb="9" key={item.id}>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? 'rgb(210, 230, 255)'
                      : 'transparent',
                  },
                ]}
                onPress={() =>
                  navigation.navigate('Detail Pokemon', {
                    detailPokemon: item,
                    title: capitalizeFirstLetter(item.detail_pokemon.name),
                  })
                }>
                <View style={styles.detailPokemonContainer}>
                  <LinearGradient
                    colors={[
                      'rgba(175,219,27,0)',
                      getPokemonElementType(
                        item.detail_pokemon.element.split(',')[0],
                      ).rgba,
                    ]}
                    style={styles.linearGradient}>
                    <View style={styles.elementContainer}>
                      <View style={styles.wrapElementContainer}>
                        {item.detail_pokemon.element
                          .split(',')
                          .map((element, i) => {
                            const elementImage = getPokemonElementType(element);
                            return (
                              <Stack direction="row" mx="2" key={i}>
                                <Image
                                  source={{uri: `${elementImage.img}`}}
                                  style={styles.imgElement}
                                />
                              </Stack>
                            );
                          })}
                      </View>
                      <View style={styles.pokemonContainer}>
                        <Image
                          source={{uri: `${item.detail_pokemon.front_default}`}}
                          style={styles.imgPokemon}
                        />
                        <View style={styles.detailNameLevelPokemon}>
                          <Text style={styles.textPokemonName}>
                            {item.detail_pokemon.name}
                          </Text>
                          <Text>Level {item.detail_pokemon.level}</Text>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </Pressable>
            </Stack>
          ))}
          <SizedBox vertical={30} />
        </ScrollView>
      ) : (
        new Array(10).fill(0).map((_, i) => (
          <Stack direction="column" mb="3" key={i}>
            <Skeleton h="40" rounded="10" key={i} />
          </Stack>
        ))
      )}
    </ScrollView>
  );
};

export default ListPokemon;
