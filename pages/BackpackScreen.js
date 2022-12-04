import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ListPokemon from '../src/components/BackpackPages/Pokemon/ListPokemon';
import ListItem from '../src/components/BackpackPages/Items/ListItem';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabNavigation} from '../src/utils/navigationTab';
import * as Animatable from 'react-native-animatable';
import Colors from '../src/utils/Colors';

const Tab = createBottomTabNavigator();
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
      name: 'Combine',
    },
  ];
  const [selectedNavigation, setSelectedNavigation] = useState(
    listNavigation[0],
  );

  const RenderTabsComponent = () => {
    if (selectedNavigation.name === 'Pokemon') {
      return <ListPokemon navigation={navigation} />;
    } else if (selectedNavigation.name === 'Items') {
      return <ListItem />;
    }
  };

  const TabButton = props => {
    const {item, onPress, accessibilityState} = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const textViewRef = useRef(null);

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={[styles.container, {flex: focused ? 1.2 : 0.65}]}>
        <View>
          <Animatable.View
            ref={viewRef}
            style={[
              StyleSheet.absoluteFillObject,
              {backgroundColor: item.color, borderRadius: 20},
            ]}
          />
          <View
            style={[
              styles.btn,
              {backgroundColor: focused ? null : item.alphaClr},
            ]}>
            <Image source={item.destination} className="w-5 h-5" />
            <Animatable.View ref={textViewRef}>
              {focused && (
                <Text
                  style={{
                    color: Colors.white,
                    paddingHorizontal: 8,
                  }}>
                  {item.label}
                </Text>
              )}
            </Animatable.View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}>
      {TabNavigation.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
});
export default BackpackScreen;
