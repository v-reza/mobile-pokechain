import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, useColorScheme} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const isFocused = useIsFocused();

  useEffect(() => {
    const getStorages = async () => {
      const access_token = await AsyncStorage.getItem('access_token');
      const refresh_token = await AsyncStorage.getItem('refresh_token');
      if (access_token && refresh_token) {
        setTimeout(() => {
          navigation.navigate('HomeStack');
        }, 2000);
      } else {
        setTimeout(() => {
          navigation.navigate('Auth');
        }, 2000);
      }
    };
    getStorages();
  }, [navigation, isFocused]);
  return (
    <View style={styles.container}>
      <Text style={isDarkMode ? styles.welcome_light : styles.welcome_dark}>
        Welcome to Pokechain
      </Text>
      <Image source={require('../dist/assets/pokechain_logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome_light: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  welcome_dark: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
