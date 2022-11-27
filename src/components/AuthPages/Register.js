import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Box, Stack, useToast, VStack} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {register} from '../../context/AuthAction';
const RegisterScreen = ({setIsTextDontHaveAccount}) => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleRegister = async e => {
    e.preventDefault();

    if (username === null || email === null || password === null) {
      toast.show({
        render: () => (
          <Box bg="rose.500" px="6" py="2" rounded="sm" mb={5}>
            Please fill in all fields
          </Box>
        ),
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.show({
        render: () => (
          <Box bg="rose.500" px="6" py="2" rounded="sm" mb={5}>
            Password and confirm password not match
          </Box>
        ),
      });
      return;
    }

    const form = {
      username,
      email,
      password,
      confirmPassword,
    };
    await register(form, ({error, loading: regLoading, message}) => {
      setLoading(regLoading);
      if (error === false) {
        toast.show({
          render: () => (
            <Box bg="green.500" px="6" py="2" rounded="sm" mb={5}>
              Register success, please login
            </Box>
          ),
        });
        return;
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
            Sign up to your account
          </Text>
        </View>
        <VStack space="2.5" mt="4">
          <Stack direction="column" mb="2.5" mt="1.5" space={8}>
            <TextInput
              placeholder="Username"
              keyboardType="default"
              value={username}
              style={isDarkMode ? styles.input_dark : styles.input_light}
              placeholderTextColor={isDarkMode ? '' : '#000'}
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              style={isDarkMode ? styles.input_dark : styles.input_light}
              placeholderTextColor={isDarkMode ? '' : '#000'}
              onChangeText={setEmail}
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
            <TextInput
              placeholder="Confirm Password"
              keyboardType="default"
              secureTextEntry={true}
              value={confirmPassword}
              style={isDarkMode ? styles.input_dark : styles.input_light}
              placeholderTextColor={isDarkMode ? '' : '#000'}
              onChangeText={setConfirmPassword}
            />
            <Text
              style={styles.textDontHaveAccount}
              onPress={() => setIsTextDontHaveAccount(false)}>
              Already have account?
            </Text>
          </Stack>
          <View style={styles.viewButton}>
            <Pressable
              style={
                !loading
                  ? styles.pressableButton
                  : styles.pressableButtonLoading
              }
              onPress={handleRegister}
              disabled={loading}>
              {!loading ? (
                <Text style={{color: 'white'}}>Sign up</Text>
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

export default RegisterScreen;
