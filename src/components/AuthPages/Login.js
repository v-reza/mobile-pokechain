import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Box, Stack, useToast, VStack} from 'native-base';
import {login} from '../../context/AuthAction';
import useAuth from '../../hooks/useAuth';

const LoginScreen = ({setIsTextDontHaveAccount, navigation}) => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const [usernameOrEmail, setUsernameOrEmail] = useState(
    'wildanfajar71@gmail.com',
  );
  const [password, setPassword] = useState('wildan');
  const {dispatch} = useAuth();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleLogin = async e => {
    e.preventDefault();

    if (usernameOrEmail === null || password === null) {
      toast.show({
        render: () => (
          <Box bg="rose.500" px="6" py="2" rounded="sm" mb={5}>
            Please fill in all fields
          </Box>
        ),
      });
      return;
    }

    const form = {
      userOrEmail: usernameOrEmail,
      password,
    };

    await login({dispatch}, form, ({error, loading: logLoading, message}) => {
      setLoading(logLoading);

      if (error === false) {
        dispatch({type: 'IS_AUTH'});
        navigation.replace('HomeStack');
      }

      if (error && message) {
        toast.show({
          render: () => (
            <Box bg="rose.500" px="6" py="2" rounded="sm" mb={5}>
              {message}
            </Box>
          ),
        });
        return;
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapContainer}>
        <Image
          source={require('../../dist/assets/icons.png')}
          style={styles.iconsLogo}
        />
        <View style={styles.viewTextSignIn}>
          <Text
            style={
              isDarkMode ? styles.signInText_dark : styles.signInText_light
            }>
            Sign in to your account
          </Text>
        </View>
        <VStack space="2.5" mt="4">
          <Stack direction="column" mb="2.5" mt="1.5" space={8}>
            <TextInput
              placeholder="Username or email"
              keyboardType="default"
              value={usernameOrEmail}
              style={isDarkMode ? styles.input_dark : styles.input_light}
              placeholderTextColor={isDarkMode ? '' : '#000'}
              onChangeText={setUsernameOrEmail}
            />
            <TextInput
              placeholder="Password"
              keyboardType="default"
              secureTextEntry={true}
              value={password}
              style={isDarkMode ? styles.input_dark : styles.input_light}
              placeholderTextColor={isDarkMode ? '' : '#000'}
              onChangeText={setPassword}
            />
            <Text
              style={styles.textDontHaveAccount}
              onPress={() => setIsTextDontHaveAccount(true)}>
              Don't have account?
            </Text>
          </Stack>
          <View style={styles.viewButton}>
            <Pressable
              style={
                !loading
                  ? styles.pressableButton
                  : styles.pressableButtonLoading
              }
              onPress={handleLogin}
              disabled={loading}>
              {!loading ? (
                <Text style={{color: 'white'}}>Sign in</Text>
              ) : (
                <ActivityIndicator size="small" color="#fff" />
              )}
            </Pressable>
          </View>
        </VStack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
  },
  wrapContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  iconsLogo: {
    width: 50,
    height: 50,
  },
  viewTextSignIn: {
    display: 'flex',
    marginTop: 30,
  },
  signInText_dark: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  signInText_light: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  input_dark: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    shadowColor: 'white',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input_light: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    borderRadius: 5,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textDontHaveAccount: {
    color: '#3D00B7',
    fontSize: 13,
  },
  viewButton: {
    marginTop: 5,
  },
  pressableButton: {
    backgroundColor: '#3D00B7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
  },
  pressableButtonLoading: {
    backgroundColor: 'rgb(75 85 99)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
  },
});

export default LoginScreen;
