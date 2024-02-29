// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://64.23.187.18:8000/forgotpassword', { email });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Send Reset Link</button>
    </div>
  );
};

export default ForgotPasswordComponent;
