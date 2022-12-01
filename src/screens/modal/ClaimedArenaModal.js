import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';
import {getClaimReward} from 'constant-pokechain';
import {ClaimRewardPath} from '../../utils/claimReward';
import {useNavigation} from '@react-navigation/native';
import {Slide} from 'native-base';
import {useMutation, useQueryClient} from 'react-query';
import {useAxios} from '../../utils/axiosInstance';
import {claimRewardToBackpack} from '../../components/HomePages/schema/mutation';
const ClaimedArenaModal = ({route}) => {
  const [reward, setReward] = useState(getClaimReward());
  const [isClaimed, setIsClaimed] = useState(false);
  const [isGoBack, setIsGoBack] = useState(false);
  const navigation = useNavigation();
  const axiosInstance = useAxios();
  const {id} = route.params;
  const queryClient = useQueryClient();
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      if (!isClaimed) {
        e.preventDefault();
        if (e.data.action.type === 'GO_BACK') {
          setIsGoBack(true);
        }
        return;
      } else {
        navigation.dispatch(e.data.action);
      }
    });
  }, [navigation, isClaimed]);

  useEffect(() => {
    if (isGoBack) {
      setTimeout(() => {
        setIsGoBack(false);
      }, 3000);
    }
  }, [isGoBack]);

  const {mutate: mutationClaimReward, error} = useMutation({
    mutationFn: data => claimRewardToBackpack(axiosInstance, data),
    onError: err => {
      console.log('error', err);
    },
    onSuccess: data => {
      queryClient.invalidateQueries('MyArena');
      queryClient.invalidateQueries('MyBackpack');
    },
  });

  useEffect(() => {
    if (reward.length === 6) {
      mutationClaimReward({items: reward, arenaChallengeId: id});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationClaimReward, reward]);

  return (
    <SafeAreaView className="flex-1 py-28">
      <Slide in={isGoBack} placement="top">
        <View className="bg-red-200 py-4 flex items-center justify-center">
          <Text className="font-bold text-red-600">
            Please claim your reward first
          </Text>
        </View>
      </Slide>
      <Slide in={isClaimed} placement="top">
        <View className="bg-green-200 py-4 flex items-center justify-center">
          <Text className="font-bold text-green-600">
            Successfully claimed your reward
          </Text>
        </View>
      </Slide>
      <View className="flex items-center justify-center">
        <Text className="text-2xl font-bold ">Your Reward</Text>
      </View>
      <View className="flex items-center flex-col">
        <View className="py-10 flex items-center justify-center flex-row flex-wrap space-y-10  space-x-6">
          {reward.map((item, i) => {
            return (
              <View
                key={i}
                className="flex flex-col items-center justify-center">
                <Image
                  source={ClaimRewardPath(item.name).imgPath}
                  className="h-20 w-20 "
                />
                <Text className="capitalize text-lg font-bold">
                  {item.name.replace('-', ' ')}
                </Text>
                <Text className="text-red-500">Qty 1</Text>
              </View>
            );
          })}
        </View>
        <View className="flex flex-row items-center space-x-4">
          {isClaimed && (
            <TouchableOpacity
              className="px-6 py-4 bg-indigo-500  rounded-lg"
              onPress={() => navigation.goBack()}>
              <Text className="text-lg font-bold">Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className={`px-20 py-4 ${
              isClaimed ? 'bg-gray-500' : 'bg-indigo-500'
            }  rounded-lg`}
            disabled={isClaimed}
            onPress={() => setIsClaimed(true)}>
            <Text className="text-lg font-bold">
              {isClaimed ? 'Claimed' : 'Claim'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ClaimedArenaModal;
