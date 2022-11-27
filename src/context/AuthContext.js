import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useReducer, useEffect, useState} from 'react';
import AuthReducer from './AuthReducer';
import jwtDecode from 'jwt-decode';
import {publicRequest} from '../utils/axiosInstance';
import {setDecodeUser} from '../redux/action/userAction';
import {useDispatch} from 'react-redux';
import React from 'react';

const initialState = {
  access_token: null,
  refresh_token: null,
  isAuthenticated: false,
  isnotAuth: true,
  ismanipAuth: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const dispatchRedux = useDispatch();

  useEffect(() => {
    const asyncToken = async () => {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const accessToken = await AsyncStorage.getItem('access_token');
      // console.log(accessToken);
      if (accessToken || refreshToken) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        });
        state.isAuthenticated = true;
      }
    };
    asyncToken();
  }, [state]);

  useEffect(() => {
    const saveState = async () => {
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const accessToken = await AsyncStorage.getItem('access_token');
      if (accessToken || state.access_token) {
        const expired = jwtDecode(accessToken).exp;
        const checkExpired =
          expired * 1000 < new Date().getTime() ? true : false;
        if (checkExpired) {
          console.log('expired');
          await publicRequest
            .get('auth/token', {
              params: {
                refreshToken: refreshToken,
              },
            })
            .then(async response => {
              const {accessToken: resAccessToken} = response.data;
              await AsyncStorage.setItem('access_token', resAccessToken);
              const decodedUser = jwtDecode(resAccessToken);
              console.log('expired decode', decodedUser);
              state.access_token = resAccessToken;
              state.refresh_token = refreshToken;
              state.isAuthenticated = true;
              setDecodeUser(dispatchRedux, decodedUser);
            })
            .catch(async error => {
              await AsyncStorage.removeItem('access_token');
              await AsyncStorage.removeItem('refresh_token');
              dispatch({type: 'LOGOUT'});
            });
        } else {
          const decodedUser = jwtDecode(
            accessToken ? accessToken : state.access_token,
          );
          setDecodeUser(dispatchRedux, decodedUser);
        }
      } else {
        dispatch({type: 'LOGOUT'});
      }
    };
    saveState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.refresh_token, state?.access_token]);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
