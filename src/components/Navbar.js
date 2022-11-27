import {Pressable, View, Image, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-ico-material-design';

const Navbar = ({navigation}) => {
  return (
    <View style={styles.topContainer}>
      <Pressable
        android_ripple={{borderless: true, radius: 20}}
        onPress={() => navigation.openDrawer()}>
        <Image
          source={require('../dist/assets/profile.png')}
          style={styles.profileIcon}
        />
      </Pressable>
      <Pressable
        android_ripple={{borderless: true, radius: 20}}
        style={styles.chatIcon}>
        <Icon name="chat-bubble" color="#448aaf" />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1D2226',
    height: 50,
  },
  profileIcon: {
    height: 30,
    width: 30,
    margin: 10,
  },
  chatIcon: {
    paddingRight: 10,
  },
});

export default Navbar;
