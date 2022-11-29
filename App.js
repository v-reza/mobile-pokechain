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
import {QueryClient, QueryClientProvider} from 'react-query';
import {TailwindProvider} from 'nativewind';

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <AuthGuard>
        <QueryClientProvider client={queryClient}>
          <AppStack />
        </QueryClientProvider>
      </AuthGuard>
    </Provider>
  );
};

export default App;
