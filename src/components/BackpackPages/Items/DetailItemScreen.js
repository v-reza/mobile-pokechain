import {
  SafeAreaView,
  View,
  Image,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Stack} from 'native-base';
import {
  getPokemonElementType,
  getEvolveItem,
  getItemType,
} from 'constant-pokechain';
import {SizedBox} from 'sizedbox';
import styles from '../../../stylesheet/BackpackScreen/module_detailpokemon_styles.js';
import useConsole from '../../../hooks/useConsole.js';

const DetailItemScreen = ({route}) => {
  const {item} = route.params;
  useConsole(item);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.pokemonContainer}>
          <Text style={styles.textBold15Size}>Quantity : {item.quantity}</Text>
          <Image
            source={{uri: `${getItemType(item.name).img}`}}
            style={styles.imgPokemon}
          />
        </View>
        <View style={styles.informationContainer}>
          <View style={styles.wrapInformationContainer}>
            <Text style={styles.textBoldSize}>Information</Text>
          </View>
          <View style={styles.statsInformationContainer}>
            <View className="flex flex-col">
              <View style={styles.wrapStats}>
                <View style={styles.statsContainer}>
                  <Text style={styles.textBold15Size}>
                    Rarity : {getItemType(item.name).detail.rarity.name}
                  </Text>
                </View>
              </View>
              <View style={styles.wrapStats}>
                <View style={styles.statsContainer}>
                  <Text style={styles.textBold15Size}>
                    Effect : {getItemType(item.name).detail.effect}
                  </Text>
                </View>
              </View>
              {getItemType(item.name).detail.required && (
                <View style={styles.wrapStats}>
                  <View style={styles.statsContainer}>
                    <Text style={styles.textBold15Size}>
                      Required Used :{' '}
                      {getItemType(item.name).detail.required.name}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
        {getItemType(item.name).detail.required?.value && (
          <View style={styles.informationContainer}>
            <View style={styles.wrapInformationContainer}>
              <Text style={styles.textBoldSize}>Detail Effect</Text>
            </View>
            <View style={styles.statsInformationContainer}>
              <View className="flex flex-col">
                {getItemType(item.name).detail.required.value?.map(
                  (list, i) => (
                    <View style={styles.wrapStats} key={i}>
                      <View style={styles.statsContainer}>
                        <Text style={styles.textBold15Size}>
                          Increase {list.name} {list.value}
                        </Text>
                      </View>
                    </View>
                  ),
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailItemScreen;
