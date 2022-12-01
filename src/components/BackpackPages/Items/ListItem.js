import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  useColorScheme,
} from 'react-native';
import React, {useEffect} from 'react';
import {useAxios} from '../../../utils/axiosInstance';
import {useQuery} from 'react-query';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../stylesheet/BackpackScreen/module_backpack_pokemon_styles';
import {VStack, Stack, Skeleton} from 'native-base';
import {getItemType} from 'constant-pokechain';
import Colors from '../../../utils/Colors';
import {getBackpackItems} from '../schema/query';
import useAuth from '../../../hooks/useAuth';
import useConsole from '../../../hooks/useConsole';
import {useNavigation} from '@react-navigation/native';
import {SizedBox} from 'sizedbox';
import {capitalizeFirstLetter} from '../../../utils/constant';

const ListItem = () => {
  const axiosInstance = useAxios();
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const navigation = useNavigation();

  const {
    data: listItems,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: 'listBackpackItem',
    queryFn: () => getBackpackItems(axiosInstance),
  });

  if (isError) {
    refetch();
  }
  return (
    <ScrollView style={styles.container}>
      {!isLoading ? (
        <ScrollView>
          {listItems?.my_items.map((item, index) => (
            <Stack direction="column" mb="9" key={item.id}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Detail Item', {
                    item,
                    title: capitalizeFirstLetter(item.name.replace('-', ' ')),
                  });
                }}>
                <View style={styles.detailPokemonContainer}>
                  <LinearGradient
                    colors={[
                      isDarkMode ? Colors.gray : Colors.darkGray,
                      getItemType(item.name).rgba,
                    ]}
                    style={styles.linearGradient}>
                    <View style={styles.elementContainer}>
                      <View style={styles.wrapElementContainer}>
                        <Text
                          style={{
                            color:
                              getItemType(item.name).detail.rarity.name ===
                              'Common'
                                ? 'white'
                                : getItemType(item.name).detail.rarity.hex,
                          }}
                          className="text-md font-extrabold">
                          {getItemType(item.name).detail.rarity.name}
                        </Text>
                      </View>
                      <View style={styles.pokemonContainer}>
                        <Image
                          source={{uri: `${getItemType(item.name).img}`}}
                          style={styles.imgPokemon}
                        />
                        <View style={styles.detailNameLevelPokemon}>
                          <Text style={styles.textPokemonName}>
                            {item.name.replace('-', ' ')}
                          </Text>
                          <Text>Qty: {item.quantity}</Text>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
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

export default ListItem;
