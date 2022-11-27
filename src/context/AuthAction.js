import AsyncStorage from '@react-native-async-storage/async-storage';
import {publicRequest} from '../utils/axiosInstance';
import jwtDecode from 'jwt-decode';

export const login = async ({dispatch}, data, cb) => {
  //cb = (callback)
  cb({
    error: null,
    loading: true,
    message: null,
  });
  dispatch({type: 'LOGIN_START'});

  await publicRequest
    .post('/auth/login', data)
    .then(async response => {
      if (response.data) {
        const {msg, accessToken} = response.data;
        const {refresh_token} = jwtDecode(accessToken);
        cb({
          error: false,
          loading: false,
          message: msg,
        });
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            access_token: accessToken,
            refresh_token,
          },
        });

        await AsyncStorage.setItem('access_token', accessToken);
        await AsyncStorage.setItem('refresh_token', refresh_token);
      }
    })
    .catch(err => {
      const {msg} = err.response.data;

      cb({
        error: true,
        loading: false,
        message: msg,
      });

      // throw err;
    });
};

export const register = async (data, cb) => {
  //cb = (callback)
  cb({
    error: null,
    loading: true,
    message: null,
  });
  await publicRequest
    .post('/auth/register', data)
    .then(response => {
      const {msg} = response.data;
      cb({
        error: false,
        loading: false,
        message: msg,
      });
    })
    .catch(e => {
      const {msg} = e.response.data;
      cb({
        error: true,
        loading: false,
        message: msg,
      });
    });
};
