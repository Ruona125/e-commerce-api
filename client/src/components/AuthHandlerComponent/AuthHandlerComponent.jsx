import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/authActions";

const AuthHandlerComponet = () => {
  const dispatch = useDispatch();
  //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const refreshAccessToken = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now();

        // Check if the access token has expired
        if (
          decodedToken &&
          decodedToken.exp &&
          currentTime >= decodedToken.exp * 1000
        ) {
          if (refreshToken) {
            try {
              // Send a request to the server to refresh the access token using the refresh token
              const response = await axios.post(
                "http://64.23.187.18:8000/refresh",
                {
                  refreshToken: refreshToken,
                }
              );
              const newToken = response.data.token;

              // Update the access token in local storage with the new token
              localStorage.setItem("token", newToken);
            } catch (error) {
              console.log("Error refreshing token:", error);

              // Handle the error by logging the user out and redirecting to the login page
              dispatch(logoutUser()); // Log the user out
              navigate("/login"); // Redirect to the login page
            }
          } else {
            console.log("Refresh token not found, logging out");

            // Handle the case where no refresh token is available
            dispatch(logoutUser()); // Log the user out
            navigate("/login"); // Redirect to the login page
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found in local storage.");

      // Handle the case where no access token is available
      dispatch(logoutUser()); // Log the user out
      navigate("/login"); // Redirect to the login page
    }
  };

  useEffect(() => {
    // Set up a timer to periodically call the refreshAccessToken function (every 1 second)
    const refreshTokenTimer = setInterval(refreshAccessToken, 100000);

    // Clear the timer when the component unmounts to prevent memory leaks
    return () => clearInterval(refreshTokenTimer);
  }, []);
};

export default AuthHandlerComponet;
