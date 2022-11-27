import {setUser} from '../reducer/userReducer';

export const setDecodeUser = async (dispatch, data) => {
  dispatch(setUser({user: data}));
};
