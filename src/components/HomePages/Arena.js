import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  Image,
  useColorScheme,
  ScrollView,
} from 'react-native';
import useUser from '../../hooks/useUser';
import styles from '../../stylesheet/HomeScreen/module_home_styles';
import {VStack, Progress} from 'native-base';
import {getArena} from '../../utils/constant';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getArenaTier} from './schema/query';
import {useAxios} from '../../utils/axiosInstance';
import {useNavigation} from '@react-navigation/native';
import {updateLoginReward} from './schema/mutation';
import Colors from '../../utils/Colors';
const Arena = () => {
  const {currentUser} = useUser();
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const axiosInstance = useAxios();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const {isLoading, data, isError, refetch} = useQuery({
    queryKey: 'MyArena',
    queryFn: () => getArenaTier(axiosInstance),
    enabled: !!currentUser?.profile.tier,
  });

  if (isError) {
    refetch();
  }

  const {mutate: mutationLoginArena} = useMutation({
    mutationFn: () => updateLoginReward(axiosInstance),
    onSuccess: () => {
      queryClient.invalidateQueries('MyArena');
    },
  });

  useEffect(() => {
    mutationLoginArena();
  }, [mutationLoginArena]);

  const isCompleteArena = item => {
    let isComplete;
    let isClaimed;
    data.completeArena.filter(completeArena => {
      if (completeArena.arena_challenge_id === item.id) {
        isComplete = true;
        isClaimed = completeArena.is_claimed;
      }
    });
    return {isComplete, isClaimed};
  };
  return (
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
          <VStack space="6" mb="4">
            {!isLoading &&
              data?.arena.arena_challenge.map((item, i) => {
                const isCompletedArena = isCompleteArena(item);
                return (
                  <View style={styles.detailChallenge} key={item.id}>
                    <Image
                      source={
                        isCompletedArena.isComplete
                          ? isCompletedArena.isClaimed
                            ? require('../../dist/assets/open-chest.png')
                            : require('../../dist/assets/closed-chest.png')
                          : require('../../dist/assets/closed-chest.png')
                      }
                      style={styles.imgChestChallenge}
                    />
                    <View style={styles.wrappingTextChallenge}>
                      <Text
                        style={[
                          isDarkMode
                            ? styles.textDarkMode
                            : styles.textLightMode,
                        ]}>
                        {item.challenge}
                      </Text>
                    </View>
                    <View>
                      <Pressable
                        onPress={() => {
                          isCompletedArena.isComplete
                            ? isCompletedArena.isClaimed
                              ? null
                              : navigation.navigate('ClaimedArenaModal', {
                                  id: item.id,
                                })
                            : navigation.navigate('Choose Battle');
                        }}
                        style={({pressed}) => [
                          styles.pressableClaim,
                          isCompletedArena.isComplete
                            ? isCompletedArena.isClaimed
                              ? styles.disabledPressableClaim
                              : {
                                  backgroundColor: pressed
                                    ? 'rgb(210, 230, 255)'
                                    : '#F59E0B',
                                }
                            : styles.disabledPressableClaim,
                        ]}>
                        <Text style={{color: Colors.darkGray}}>
                          {isCompletedArena.isComplete
                            ? isCompletedArena.isClaimed
                              ? 'Claimed'
                              : 'Claim'
                            : 'Go'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
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
                    ?.required_point_level_up - currentUser?.profile.point}{' '}
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
                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6875F5',
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
  );
};

export default Arena;
