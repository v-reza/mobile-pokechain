// import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://5241-158-140-172-115.ap.ngrok.io/api/v1/';

export const useAxios = () => {
  const {access_token, dispatch} = useAuth();

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  axiosInstance.interceptors.request.use(async req => {
    const {exp, refresh_token} = jwtDecode(access_token);
    if (exp * 1000 < new Date().getTime()) {
      try {
        const response = await publicRequest.get('/auth/token', {
          params: {
            refreshToken: refresh_token,
          },
        });
        const {accessToken} = response.data;
        await AsyncStorage.setItem('access_token', accessToken);
        req.headers.Authorization = `Bearer ${accessToken}`;
      } catch (error) {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        dispatch({type: 'LOGOUT'});
      }
    }
    return req;
  });

  return axiosInstance;
};

export const publicRequest = axios.create({
  baseURL: baseURL,
});
