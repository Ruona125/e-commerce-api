import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Redux/authActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const SignUpComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        isAdmin: true,
      });
      const [errorMessage, setErrorMessage] = useState(null);
      const navigate = useNavigate();
      const isLoading = useSelector((state) => state.auth.isLoading);
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://64.23.187.18:8000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // Registration successful
            setErrorMessage(null);
            navigate("/")
            console.log('User registered successfully');
          } else {
            // Registration failed
            const data = await response.json();
            setErrorMessage(data.message);
          }
        } catch (error) {
          console.error('Internal Server Error:', error);
          setErrorMessage('Internal Server Error');
        }
      };
      return (
        <div className="center-container">
          <h2 className="login-header">Sign Up</h2>
          
          {isLoading ? (
            <CircularProgress />
          ) : (
            <form onSubmit={handleSubmit} className="login-form">
                <TextField
                type="text"
                name="username"
                value={formData.username}
                variant="outlined"
                margin="normal"
                label="Username"
                onChange={handleChange}
              />
              <br />
              <TextField
                type="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <br />
              <TextField
                 type="password"
                 name="password"
                 label="password"
                 value={formData.password}
                 onChange={handleChange}
                 variant="outlined"
                margin="normal"
              />
              
              <TextField
                type="tel"
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
    
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                    marginTop: "23px",
                    fontFamily: "Edu TAS Beginner, cursive",
                    backgroundColor: "rgb(214, 119, 178)",
                }}
              >
                Sign Up
              </Button>
    
              <br />
              <Link style={{textDecoration:"none"}} to={"/login"}><p>Already have an account, login</p></Link>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
          )}
        </div>
      )
}

export default SignUpComponent