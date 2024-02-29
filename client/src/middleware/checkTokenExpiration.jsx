import jwtDecode from 'jwt-decode';
// import { logoutOnTokenExpiration } from '../Redux/authSlice';

const checkTokenExpirationMiddleware = store => next => action => {
  const state = store.getState();
  // console.log(state.auth)
  const { token } = state.auth;

  // Check for token expiration periodically
  // console.log(token)
  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

    // Check if the token has expired
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      // store.dispatch(logoutOnTokenExpiration());
    }
  }

  return next(action);
};

export default checkTokenExpirationMiddleware;
