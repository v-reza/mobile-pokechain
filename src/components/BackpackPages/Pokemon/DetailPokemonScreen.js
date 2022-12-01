import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import {Stack} from 'native-base';
import {
  getPokemonElementType,
  getEvolveItem,
  getItemType,
} from 'constant-pokechain';
import {SizedBox} from 'sizedbox';
import styles from '../../../stylesheet/BackpackScreen/module_detailpokemon_styles.js';
import LinearGradient from 'react-native-linear-gradient';
import {useQuery} from 'react-query';
import {getBackpackItems, getPokemonEvolution} from '../schema/query.js';
import {useAxios} from '../../../utils/axiosInstance.js';
import {Slide} from 'native-base';
const DetailPokemonScreen = ({route}) => {
  const {detailPokemon: item} = route.params;
  const axiosInstance = useAxios();
  const [slideErrorEvolve, setSlideErrorEvolve] = useState(false);
  const [slideErrorMessage, setSlideErrorMessage] = useState('');
  const [isSuccessEvolve, setIsSuccessEvolve] = useState(false);
  const {isFetching, data: isEvolve} = useQuery({
    queryKey: ['detailPokemon', item.detail_pokemon.name],
    queryFn: () => getPokemonEvolution(item.detail_pokemon.name),
    enabled: !!item.detail_pokemon.name,
    refetchOnWindowFocus: false,
  });

  const {data: listItems} = useQuery({
    queryKey: 'listBackpackItemDetailPokemon',
    queryFn: () => getBackpackItems(axiosInstance),
  });

  const handleEvolve = isEvolvedPokemon => {
    const awakeningItem = listItems?.my_items.find(
      awaken => awaken.name === 'awakening',
    )
      ? listItems?.my_items.find(awaken => awaken.name === 'awakening').quantity
      : 0;
    if (item.detail_pokemon.level < 10) {
      setSlideErrorEvolve(true);
      setSlideErrorMessage('Level Pokemon must be 10 or max');
      return;
    } else if (awakeningItem < 1) {
      setSlideErrorEvolve(true);
      setSlideErrorMessage('You dont have awakening item');
      return;
    }

    if (isEvolvedPokemon.required_item) {
      const evolveItemRequired = listItems?.my_items.find(
        evolveItem => evolveItem.name === isEvolvedPokemon.required_item,
      )
        ? listItems?.my_items.find(
            evolveItem => evolveItem.name === isEvolvedPokemon.required_item,
          ).quantity
        : 0;
      if (evolveItemRequired < 1) {
        const nameItem = getItemType(isEvolvedPokemon.required_item).detail
          .name;
        setSlideErrorEvolve(true);
        setSlideErrorMessage(`Your ${nameItem} is less than required`);
        return;
      }
    }
  };

  useEffect(() => {
    if (slideErrorEvolve) {
      setTimeout(() => {
        setSlideErrorEvolve(false);
      }, 3000);
    }
  }, [slideErrorEvolve]);
  return (
    <SafeAreaView style={styles.container}>
      <Slide in={slideErrorEvolve} placement="top">
        <View className="bg-red-200 py-4 flex items-center justify-center">
          <Text className="font-bold text-red-600">{slideErrorMessage}</Text>
        </View>
      </Slide>
      <ScrollView>
        <View style={styles.pokemonContainer}>
          <Text style={styles.textBold15Size}>
            Level {item.detail_pokemon.level} / 10
          </Text>
          <Image
            source={{uri: `${item.detail_pokemon.front_default}`}}
            style={styles.imgPokemon}
          />
        </View>
        <View style={styles.informationContainer}>
          <View style={styles.wrapInformationContainer}>
            <Text style={styles.textBoldSize}>Information</Text>
          </View>
          <View style={styles.statsInformationContainer}>
            <Stack direction="row" mx="2" mb="8">
              <View style={styles.wrapStats}>
                <Image
                  source={require('../../../dist/assets/health.jpeg')}
                  style={styles.img50}
                />
                <SizedBox horizontal={10} />
                <View style={styles.statsContainer}>
                  <Text style={styles.textBold15Size}>
                    Health {item.detail_pokemon.health}
                  </Text>
                </View>
              </View>
            </Stack>
            <Stack direction="row" mx="2" mb="8">
              <View style={styles.wrapStats}>
                <Image
                  source={require('../../../dist/assets/attack.jpeg')}
                  style={styles.img50}
                />
                <SizedBox horizontal={10} />
                <View style={styles.statsContainer}>
                  <Text style={styles.textBold15Size}>
                    Attack {item.detail_pokemon.attack}
                  </Text>
                </View>
              </View>
            </Stack>
            <Stack direction="row" mx="2" mb="8">
              <View style={styles.wrapStats}>
                <Image
                  source={require('../../../dist/assets/defense.png')}
                  style={styles.img50}
                />
                <SizedBox horizontal={10} />
                <View style={styles.statsContainer}>
                  <Text style={styles.textBold15Size}>
                    Defense {item.detail_pokemon.defense}
                  </Text>
                </View>
              </View>
            </Stack>
          </View>
        </View>
        <View style={styles.informationContainer}>
          <View style={styles.wrapInformationContainer}>
            <Text style={styles.textBoldSize}>Element</Text>
          </View>
          <View style={styles.statsInformationContainer}>
            {item.detail_pokemon.element.split(',').map((element, i) => {
              const elementImage = getPokemonElementType(element);
              return (
                <Stack direction="row" mx="2" mb="8" key={i}>
                  <View style={styles.wrapStats}>
                    <Image
                      source={{uri: `${elementImage.img}`}}
                      style={styles.img50}
                    />
                    <SizedBox horizontal={10} />
                    <View style={styles.statsContainer}>
                      <Text
                        style={[styles.textBold15Size, styles.capitalizeText]}>
                        {element}
                      </Text>
                    </View>
                  </View>
                </Stack>
              );
            })}
          </View>
        </View>
        {!isFetching && isEvolve.results?.pokemon_evolutions.length > 0 && (
          <View style={styles.informationContainer}>
            <View style={styles.wrapInformationContainer}>
              <Text style={styles.textBoldSize}>Growth Evolution</Text>
            </View>
            {isEvolve.results?.pokemon_evolutions.map((evolve, i) => (
              <View key={evolve.id}>
                <Stack direction="column" mb="9">
                  <View style={styles.detailPokemonContainer}>
                    <LinearGradient
                      colors={[
                        'rgba(175,219,27,0)',
                        getPokemonElementType(evolve.element.split(',')[0])
                          .rgba,
                      ]}
                      style={styles.linearGradient}>
                      <View style={styles.elementContainer}>
                        <View style={styles.pokemonEvolveContainer}>
                          <Image
                            source={{
                              uri: `${evolve.front_default}`,
                            }}
                            style={styles.imgPokemonEvolve}
                          />
                          <View style={styles.detailNameLevelPokemon}>
                            <Text style={styles.capitalizeText}>
                              {evolve.name}
                            </Text>
                            <Text>Level {evolve.level}</Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.informationContainer}>
                        <View style={styles.wrapInformationContainer}>
                          <Text style={styles.textBoldSize}>Information</Text>
                        </View>
                        <View style={styles.statsInformationContainer}>
                          <Stack direction="row" mx="2" mb="8">
                            <View style={styles.wrapStats}>
                              <Image
                                source={require('../../../dist/assets/health.jpeg')}
                                style={styles.img50}
                              />
                              <SizedBox horizontal={10} />
                              <View style={styles.statsContainer}>
                                <Text style={styles.textBold15Size}>
                                  Health {evolve.health}
                                </Text>
                              </View>
                            </View>
                          </Stack>
                          <Stack direction="row" mx="2" mb="8">
                            <View style={styles.wrapStats}>
                              <Image
                                source={require('../../../dist/assets/attack.jpeg')}
                                style={styles.img50}
                              />
                              <SizedBox horizontal={10} />
                              <View style={styles.statsContainer}>
                                <Text style={styles.textBold15Size}>
                                  Attack {evolve.attack}
                                </Text>
                              </View>
                            </View>
                          </Stack>
                          <Stack direction="row" mx="2" mb="8">
                            <View style={styles.wrapStats}>
                              <Image
                                source={require('../../../dist/assets/defense.png')}
                                style={styles.img50}
                              />
                              <SizedBox horizontal={10} />
                              <View style={styles.statsContainer}>
                                <Text style={styles.textBold15Size}>
                                  Defense {evolve.defense}
                                </Text>
                              </View>
                            </View>
                          </Stack>
                        </View>
                      </View>
                      <View style={styles.informationContainer}>
                        <View style={styles.wrapInformationContainer}>
                          <Text style={styles.textBoldSize}>Element</Text>
                        </View>
                        <View style={styles.statsInformationContainer}>
                          {evolve.element.split(',').map((elementEvolve, i) => {
                            const elementImage =
                              getPokemonElementType(elementEvolve);
                            return (
                              <Stack direction="row" mx="2" mb="8" key={i}>
                                <View style={styles.wrapStats}>
                                  <Image
                                    source={{uri: `${elementImage.img}`}}
                                    style={styles.img50}
                                  />
                                  <SizedBox horizontal={10} />
                                  <View style={styles.statsContainer}>
                                    <Text
                                      style={[
                                        styles.textBold15Size,
                                        styles.capitalizeText,
                                      ]}>
                                      {elementEvolve}
                                    </Text>
                                  </View>
                                </View>
                              </Stack>
                            );
                          })}
                        </View>
                      </View>
                      <View style={styles.informationContainer}>
                        <View style={styles.wrapInformationContainer}>
                          <Text style={styles.textBoldSize}>
                            Required Evolution Item
                          </Text>
                        </View>
                        <View style={styles.statsInformationContainer}>
                          <Stack direction="row" mx="2" mb="8">
                            <View style={styles.wrapStats}>
                              <Image
                                source={require('../../../dist/assets/items/awakening.webp')}
                                className="w-auto h-auto"
                              />
                              <SizedBox horizontal={10} />
                              <View
                                style={styles.statsContainer}
                                className="self-center">
                                <Text
                                  style={[
                                    styles.textBold15Size,
                                    styles.capitalizeText,
                                  ]}>
                                  Awakening{' '}
                                  <Text>
                                    {listItems?.my_items.find(
                                      items => items.name === 'awakening',
                                    )
                                      ? listItems?.my_items.find(
                                          items => items.name === 'awakening',
                                        ).quantity
                                      : 0}
                                    /1
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          </Stack>
                          {evolve.required_item && (
                            <View>
                              <Stack direction="row" mx="2" mb="8">
                                <View style={styles.wrapStats}>
                                  <Image
                                    source={{
                                      uri: `${
                                        getEvolveItem(evolve.required_item).img
                                      }`,
                                    }}
                                    style={styles.img50}
                                  />
                                  <SizedBox horizontal={10} />
                                  <View style={styles.statsContainer}>
                                    <Text
                                      style={[
                                        styles.textBold15Size,
                                        styles.capitalizeText,
                                      ]}>
                                      {evolve.required_item.replace('-', ' ')}{' '}
                                      <Text>
                                        {listItems?.my_items.find(
                                          items =>
                                            items.name === evolve.required_item,
                                        )
                                          ? listItems?.my_items.find(
                                              items =>
                                                items.name ===
                                                evolve.required_item,
                                            ).quantity
                                          : 0}
                                        /{evolve.qty_required_item}
                                      </Text>
                                    </Text>
                                  </View>
                                </View>
                              </Stack>
                            </View>
                          )}
                          <Pressable
                            style={({pressed}) => [
                              {
                                backgroundColor: pressed
                                  ? 'rgb(210, 230, 255)'
                                  : '#6875F5',
                              },
                              styles.btnEvolve,
                            ]}
                            onPress={() => handleEvolve(evolve)}>
                            <Text style={styles.textBold15Size}>Evolve</Text>
                          </Pressable>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                </Stack>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailPokemonScreen;
