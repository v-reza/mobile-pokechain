import {useEffect} from 'react';
import useAuth from './useAuth';

const useConsole = (data, getToken = false) => {
  const {access_token} = useAuth();
  useEffect(() => {
    if (getToken) {
      console.log('access_token', access_token);
    } else {
      console.log('data', data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useConsole;
