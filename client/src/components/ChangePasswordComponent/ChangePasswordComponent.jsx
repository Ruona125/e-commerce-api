import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const ChangePasswordComponent = () => {
  return (
    <div className="center-container">
      <h2 className="login-header">Change Password</h2>
      <form className="login-form">
        <TextField
          label="Old Password"
          type="password"
          variant="outlined"
          margin="normal"
          // onChange={handleInputChange}
          name="Old Password"
        />
        <br />
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          margin="normal"
          // onChange={handleInputChange}
          name="password"
        />

        <br />

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          // onChange={handleInputChange}
          name="Confirm Password"
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
          Change Password
        </Button>

        <br />
      </form>
    </div>
  );
};

export default ChangePasswordComponent;
