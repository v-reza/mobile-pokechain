import React, {useState} from 'react';
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
import {VStack} from 'native-base';
import styles from '../src/stylesheet/BackpackScreen/module_backpack_styles';
import Navbar from '../src/components/Navbar';
import ListPokemon from '../src/components/BackpackPages/Pokemon/ListPokemon';
const BackpackScreen = ({navigation}) => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const listNavigation = [
    {
      name: 'Pokemon',
    },
    {
      name: 'Items',
    },
    {
      name: 'Bundles',
    },
    {
      name: 'Token',
    },
  ];
  const [selectedNavigation, setSelectedNavigation] = useState(
    listNavigation[0],
  );

  const RenderTabsComponent = () => {
    if (selectedNavigation.name === 'Pokemon') {
      return <ListPokemon navigation={navigation} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.listNavigation}>
        <View style={styles.headingContainer}>
          <Text
            style={[
              styles.headingText,
              isDarkMode ? styles.textDarkMode : styles.textLightMode,
            ]}>
            Backpack
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollNavigation}>
          {listNavigation.map((item, index) => (
            <Pressable
              onPress={() => setSelectedNavigation(item)}
              key={index}
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? 'rgb(210, 230, 255)'
                    : item.name === selectedNavigation.name
                    ? '#6875F5'
                    : 'transparent',
                },
                styles.btnNavigation,
              ]}>
              <Text
                style={isDarkMode ? styles.textDarkMode : styles.textLightMode}>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <RenderTabsComponent />
    </SafeAreaView>
  );
};

export default BackpackScreen;
