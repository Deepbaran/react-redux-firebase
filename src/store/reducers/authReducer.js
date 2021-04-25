const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login failed'
      };
    case 'LOGIN_SUCCESS':
      console.log('Login Success');
      return {
        ...state,
        authError: null
      };
    case 'SIGNOUT_SUCCESS':
      console.log('Sign out success');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('sign up success');
      return {
        ...state,
        authError: null
      };
    case 'SIGNUP_ERROR':
      console.log('sign up error');
      return {
        ...state,
        authError: action.payload.message
      };
    default:
      return state;
  }
};

export default authReducer;
