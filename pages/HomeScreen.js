import React, {useState} from 'react';
import {
  Text,
  View,
  Pressable,
  Image,
  useColorScheme,
  ScrollView,
  Button,
} from 'react-native';
import useUser from '../src/hooks/useUser';
import Navbar from '../src/components/Navbar';
import styles from '../src/stylesheet/HomeScreen/module_home_styles';
import {VStack, Progress} from 'native-base';
import {getArena} from '../src/utils/constant';
import Modal from 'react-native-modal';
import {useQuery} from 'react-query';
import Arena from '../src/components/HomePages/Arena';

const HomeScreen = ({navigation}) => {
  const [showModalBattle, setShowModalBattle] = useState(false);
  const {currentUser} = useUser();
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={styles.containerStatsUser}>
        <View>
          <Text
            style={
              isDarkMode
                ? styles.currentUserWelcome
                : styles.currentUserWelcome_light
            }>
            Welcome back {currentUser?.username}
          </Text>
        </View>
        <View style={styles.statsUser}>
          <View style={styles.wrapLevelUser}>
            <Image
              source={require('../src/dist/assets/level.png')}
              style={styles.imgStatsLevelUser}
            />
            <Text
              style={
                isDarkMode ? styles.textStatsUser : styles.textStatsUser_light
              }>
              Level 1
            </Text>
          </View>
          <View style={styles.wrapTokenUser}>
            <Image
              source={require('../src/dist/assets/pokechain_logo.png')}
              style={styles.imgStatsTokenUser}
            />
            <Text
              style={
                isDarkMode ? styles.textStatsUser : styles.textStatsUser_light
              }>
              {parseFloat(currentUser?.profile.token) || 0}
            </Text>
          </View>
        </View>
      </View>
      <Arena />
      <View style={styles.navContainer}>
        <View style={styles.bottomNavbar}>
          <Pressable
            style={styles.iconBehave}
            android_ripple={{borderless: true, radius: 50}}
            onPress={() => navigation.navigate('Choose Battle')}>
            <Image
              source={require('../src/dist/assets/battle-icon.png')}
              style={styles.battleIcon}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
