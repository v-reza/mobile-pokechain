/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {AuthContextProvider as AuthGuard} from './src/context/AuthContext';
import AppStack from './AppStack';
const App = () => {
  return (
    <Provider store={store}>
      <AuthGuard>
        <AppStack />
      </AuthGuard>
    </Provider>
  );
};

export default App;
