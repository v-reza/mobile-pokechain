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
            <Text
              style={[
                styles.textArena,
                isDarkMode ? styles.textDarkMode : styles.textLightMode,
              ]}>
              Arena
            </Text>
          </View>
          <ScrollView style={styles.listArenaContainer}>
            <VStack space="6">
              <View style={styles.detailChallenge}>
                <Image
                  source={require('../src/dist/assets/closed-chest.png')}
                  style={styles.imgChestChallenge}
                />
                <View style={styles.wrappingTextChallenge}>
                  <Text
                    style={
                      isDarkMode ? styles.textDarkMode : styles.textLightMode
                    }>
                    Win the match 10x
                  </Text>
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
                  <Text
                    style={
                      isDarkMode ? styles.textDarkMode : styles.textLightMode
                    }>
                    Play with pokemon fire & win the game
                  </Text>
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
          <View style={styles.wrapArenaLevelContainer}>
            <Text
              style={[
                styles.textArena,
                isDarkMode ? styles.textDarkMode : styles.textLightMode,
              ]}>
              Arena {currentUser?.profile.tier}
            </Text>
            <View>
              {getArena(currentUser?.profile.tier)?.required_point_level_up -
                currentUser?.profile.point >
              0 ? (
                <View>
                  <Text
                    style={[
                      styles.requiredPoint,
                      isDarkMode ? styles.textDarkMode : styles.textLightMode,
                    ]}>
                    Need{' '}
                    {getArena(currentUser?.profile.tier)
                      ?.required_point_level_up -
                      currentUser?.profile.point}{' '}
                    points to level up
                  </Text>
                  <Progress
                    value={
                      currentUser?.profile?.point /
                      getArena(currentUser?.profile.tier).value_level
                    }
                    mt="2"
                  />
                </View>
              ) : (
                <Pressable
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed
                        ? 'rgb(210, 230, 255)'
                        : '#6875F5',
                    },
                    styles.pressableLevelup,
                  ]}>
                  <Text style={styles.requiredPoint}>Level Up</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.navContainer}>
        <View style={styles.bottomNavbar}>
          <Pressable
            style={styles.iconBehave}
            android_ripple={{borderless: true, radius: 50}}
            onPress={() => navigation.navigate('Choose Batle')}>
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
