// Logout.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/authActions';

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
