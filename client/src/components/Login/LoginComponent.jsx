import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Redux/authActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "./login.css";

function LoginComponent() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input is for the email field, convert it to lowercase
    const lowercasedValue = name === "email" ? value.toLowerCase() : value;

    setFormData({
      ...formData,
      [name]: lowercasedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="center-container">
      <h2 className="login-header">Login</h2>

      {isLoading ? (
        <CircularProgress style={{ color: 'rgb(214, 119, 178)'}} />
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
            name="email"
          />
          <br />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
            name="password"
          />

          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              marginTop: "23px",
              fontFamily: "Edu TAS Beginner, cursive",
              backgroundColor: "rgb(214, 119, 178)", // Set the background color
            }}
          >
            Login
          </Button>
         

          <br />
          <Link style={{textDecoration:"none"}} to={"/signup"}><p>Don't have an account, Sign Up</p></Link>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
}

export default LoginComponent;
