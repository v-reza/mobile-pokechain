import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import LoginScreen from '../src/components/AuthPages/Login';
import RegisterScreen from '../src/components/AuthPages/Register';
import SplashScreen from '../src/components/SplashScreen';
import useAuth from '../src/hooks/useAuth';

const AuthScreen = ({navigation}) => {
  const [isTextDontHaveAccount, setIsTextDontHaveAccount] = useState(false);
  const {isnotAuth, isAuthenticated, ismanipAuth} = useAuth();

  // if (isnotAuth) {
  //   return <SplashScreen />;
  // }
  return (
    <SafeAreaView>
      {!isTextDontHaveAccount ? (
        <LoginScreen
          setIsTextDontHaveAccount={setIsTextDontHaveAccount}
          navigation={navigation}
        />
      ) : (
        <RegisterScreen setIsTextDontHaveAccount={setIsTextDontHaveAccount} />
      )}
    </SafeAreaView>
  );
};

export default AuthScreen;
