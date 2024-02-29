// ResetPassword.js
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";

const ResetPasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { reset_token } = useParams(); // Use useParams to get the reset_token from the route parameters

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        `http://64.23.187.18:8000/reset/password/${reset_token}`,
        {
          password,
          confirm_password: confirmPassword,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="center-container">
      <h2 className="login-header">Reset Password</h2>
      <div className="login-form">
        <TextField
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPasswordComponent;
