import { setUser, setLoading, setError, clearUser, setToken, setRefreshToken } from './authSlice';

export const loginUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    // Make an API request to the login endpoint
    const response = await fetch('http://64.23.187.18:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(setUser(data.user));
      // console.log(data)
      // localStorage.setItem('token', data.token)
      dispatch(setToken(localStorage.setItem('token', data.token)))
      dispatch(setRefreshToken(localStorage.setItem("refreshToken", data.refreshToken)))
      // console.log(localStorage.getItem())
    } else {
      dispatch(setError(data.message));
    }
  } catch (error) {
    dispatch(setError('An error occurred'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => (dispatch) => {
  // Implement logout logic, e.g., clearing tokens, etc.
  // Then, clear the user from the store.
  dispatch(clearUser());
  localStorage.removeItem("token")
  // localStorage.removeItem("refreshToken")
};
