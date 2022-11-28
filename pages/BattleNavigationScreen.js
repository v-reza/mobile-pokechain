import React from 'react';
import {View, SafeAreaView, Pressable, Text} from 'react-native';
import {VStack} from 'native-base';
import styles from '../src/stylesheet/BattleNavigationScreen/module_battlenavigation_styles';
const BattleNavigationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnContainer}>
        <VStack space="24">
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6875F5',
              },
              styles.btnMatch,
            ]}>
            <Text style={styles.textBtn}>Create new match</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6875F5',
              },
              styles.btnMatch,
            ]}>
            <Text style={styles.textBtn}>Find open match</Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#6875F5',
              },
              styles.btnMatch,
            ]}>
            <Text style={styles.textBtn}>Join by match id</Text>
          </Pressable>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

export default BattleNavigationScreen;
