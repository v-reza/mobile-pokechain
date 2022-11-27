import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  useColorScheme,
  ScrollView,
} from 'react-native';
import useUser from '../src/hooks/useUser';
import Navbar from '../src/components/Navbar';
import styles from '../src/stylesheet/HomeScreen/module_home_styles';
import {Stack, VStack} from 'native-base';
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
      <View style={styles.arenaContainer}>
        <View style={styles.arenaBorder}>
          <View style={styles.wrapArenaContainer}>
            <Text style={styles.textArena}>Arena</Text>
          </View>
          <ScrollView style={styles.listArenaContainer}>
            <VStack space="6">
              <View style={styles.detailChallenge}>
                <Image
                  source={require('../src/dist/assets/closed-chest.png')}
                  style={styles.imgChestChallenge}
                />
                <View style={styles.wrappingTextChallenge}>
                  <Text>Win the match 10x</Text>
                </View>
                <View>
                  <Pressable
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed
                          ? 'rgb(210, 230, 255)'
                          : '#F59E0B',
                      },
                      styles.pressableClaim,
                    ]}>
                    <Text>Claim</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.detailChallenge}>
                <Image
                  source={require('../src/dist/assets/open-chest.png')}
                  style={styles.imgChestChallenge}
                />
                <View style={styles.wrappingTextChallenge}>
                  <Text>Play with pokemon fire & win the game</Text>
                </View>
                <View>
                  <Pressable
                    disabled={true}
                    style={[
                      styles.pressableClaim,
                      styles.disabledPressableClaim,
                    ]}>
                    <Text>Claimed</Text>
                  </Pressable>
                </View>
              </View>
            </VStack>
          </ScrollView>
          <View style={styles.wrapArenaContainer}>
            <Text style={styles.textArena}>Arena</Text>
          </View>
        </View>
      </View>
      <View style={styles.navContainer}>
        <View style={styles.bottomNavbar}>
          <Pressable
            style={styles.iconBehave}
            android_ripple={{borderless: true, radius: 50}}
            onPress={() => setShowModalBattle(true)}>
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
