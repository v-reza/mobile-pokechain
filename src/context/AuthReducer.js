const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        access_token: null,
        isAuthenticated: false,
        refresh_token: null,
        isnotAuth: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        access_token: action.payload.access_token,
        isAuthenticated: true,
        refresh_token: action.payload.refresh_token,
        isnotAuth: false,
      };
    case 'LOGIN_FAILURE':
      return {
        access_token: null,
        isAuthenticated: false,
        refresh_token: null,
        isnotAuth: true,
      };
    case 'LOGOUT':
      return {
        access_token: null,
        isAuthenticated: false,
        refresh_token: null,
        isnotAuth: true,
      };
    case 'UPDATE_JWT_TOKEN':
      return {
        access_token: action.payload.access_token,
        isAuthenticated: true,
        refresh_token: action.payload.refresh_token,
      };
    case 'IS_AUTH':
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
  }
};

export default AuthReducer;
