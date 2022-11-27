/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  useColorScheme,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  Pressable,
  Text,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NativeBaseProvider} from 'native-base';

import HomeScreen from './pages/HomeScreen';
import AuthScreen from './pages/AuthScreen';
import SplashScreen from './src/components/SplashScreen';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import useAuth from './src/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const {dispatch} = useAuth();
  const scheme = useColorScheme();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    dispatch({type: 'LOGOUT'});
    props.navigation.replace('Auth');
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#1D2226',
      }}>
      <DrawerContentScrollView {...props}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
          <DrawerItemList {...props} />
        </SafeAreaView>
      </DrawerContentScrollView>
      <Pressable android_ripple={{borderless: false}} onPress={handleLogout}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <Image
            source={require('./src/dist/assets/logout.png')}
            style={{width: 20, height: 20}}
          />
          <Text
            style={{
              marginLeft: 10,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Logout
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const RootStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

const AppStack = () => {
  const scheme = useColorScheme();
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NativeBaseProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="SplashScreen">
          <Stack.Screen name="HomeStack" component={RootStack} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default AppStack;
