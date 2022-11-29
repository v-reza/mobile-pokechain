/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  useColorScheme,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import AuthScreen from './pages/AuthScreen';
import SplashScreen from './src/components/SplashScreen';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  useDrawerProgress,
} from '@react-navigation/drawer';
import useAuth from './src/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BattleNavigationScreen from './pages/BattleNavigationScreen';
import DetailPokemonScreen from './src/components/BackpackPages/Pokemon/DetailPokemonScreen';
import Colors from './src/utils/Colors';
import {ProfileScreen, ScreenNavigation} from './src/utils/navigationDrawer';
import useUser from './src/hooks/useUser';
import {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import Animated from 'react-native-reanimated';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 20,
  },
  marginTop: {
    marginTop: 10,
  },
  marginBottom: {
    marginBottom: 15,
  },
  marginVertical: {
    marginVertical: 10,
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  label: {
    fontSize: 16,
    paddingHorizontal: 16,
  },
  profileView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: 20,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
});

const DrawerItem = ({
  label,
  onPress,
  tabBarTestId,
  icon,
  color,
  activeItemColor,
  isFocused,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      testID={tabBarTestId}
      accessibilityRole="button"
      style={[
        styles.drawerItem,
        {backgroundColor: activeItemColor, borderRadius: 5},
      ]}>
      <Image source={icon} style={{width: 20, height: 20}} />
      <Text
        style={[
          styles.label,
          {color: color, fontWeight: isFocused ? 'bold' : 'normal'},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = props => {
  const {state, descriptors, navigation} = props;
  const {dispatch} = useAuth();
  const {currentUser} = useUser();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    dispatch({type: 'LOGOUT'});
    props.navigation.replace('Auth');
  };

  const drawerProgress = useDrawerProgress();
  const viewStyles = useAnimatedStyle(() => {
    const translateX = interpolate(drawerProgress.value, [0, 1], [-500, 0]);
    return {
      transform: [{translateX}],
    };
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={[
          {
            backgroundColor: '#1D2226',
          },
          styles.view,
          styles.marginTop,
          styles.drawerItem,
        ]}>
        <Image
          source={require('./src/dist/assets/pikachu.png')}
          style={{height: 50, width: 50}}
        />
        <Text
          style={[
            styles.label,
            {fontWeight: 'bold', textTransform: 'capitalize'},
          ]}>
          Hello There!
        </Text>
      </View>
      <DrawerContentScrollView
        {...props}
        style={styles.marginVertical}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}>
        {/* Navigation Menu */}
        <Animated.View
          {...props}
          style={[
            {
              backgroundColor: '#1D2226',
            },
            styles.view,
            viewStyles,
          ]}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const {options} = descriptors[route.key];

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            // console.log(options)
            const color = isFocused ? Colors.normal : Colors.gray;
            const drawerItem = options.item;
            const activeItemColor = isFocused ? Colors.primary : null;
            if (options?.as !== 'profilescreen') {
              return (
                <DrawerItem
                  key={index}
                  label={drawerItem.label}
                  tabBarTestId={options.tabBarTestId}
                  onPress={onPress}
                  icon={drawerItem.destination}
                  color={color}
                  activeItemColor={activeItemColor}
                  isFocused={isFocused}
                />
              );
            }
          })}
        </Animated.View>
        <Animated.View
          style={[
            {
              backgroundColor: '#1D2226',
            },
            styles.view,
            styles.marginVertical,
            viewStyles,
          ]}>
          <View style={styles.profileView}>
            <Image
              source={
                currentUser?.profile.picture
                  ? {
                      uri: currentUser?.profile.picture,
                    }
                  : require('./src/dist/assets/profiles.png')
              }
              style={{height: 160, width: 100}}
            />
            <Text
              style={[
                styles.label,
                styles.textBold,
                styles.textCapitalize,
                styles.marginVertical,
              ]}>
              {currentUser?.username}
            </Text>
            <Text style={styles.marginHorizontal}>Level 1</Text>
          </View>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const {options} = descriptors[route.key];

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            // console.log(options)
            const color = isFocused ? Colors.normal : Colors.gray;
            const drawerItem = options.item;
            const activeItemColor = isFocused ? Colors.primary : null;
            if (options?.as === 'profilescreen') {
              return (
                <DrawerItem
                  key={index}
                  label={drawerItem.label}
                  tabBarTestId={options.tabBarTestId}
                  onPress={onPress}
                  icon={drawerItem.destination}
                  color={color}
                  activeItemColor={activeItemColor}
                  isFocused={isFocused}
                />
              );
            }
          })}
        </Animated.View>
        {/* Profile Menu */}
      </DrawerContentScrollView>

      <View
        style={[
          {
            backgroundColor: '#1D2226',
          },
          styles.view,
          styles.marginBottom,
        ]}>
        <TouchableOpacity onPress={handleLogout} accessibilityRole="button">
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
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
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const RootStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 260,
          backgroundColor: 'transparent',
        },
        drawerType: 'front',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {ScreenNavigation.map((_, i) => (
        <Drawer.Screen
          key={i}
          name={_.route}
          component={_.component}
          options={{
            item: _,
          }}
        />
      ))}
      {ProfileScreen.map((_p, i) => (
        <Drawer.Screen
          key={i}
          name={_p.route}
          component={_p.component}
          options={{
            item: _p,
            as: 'profilescreen',
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

const AppStack = () => {
  const scheme = useColorScheme();

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
          <Stack.Screen
            options={{
              headerShown: true,
            }}
            name="Choose Batle"
            component={BattleNavigationScreen}
          />
          <Stack.Screen
            name="Detail Pokemon"
            component={DetailPokemonScreen}
            options={({route}) => ({
              headerShown: true,
              title: route.params.title,
            })}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default AppStack;
