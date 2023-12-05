const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/userModels");
const sgMail = require("@sendgrid/mail");
// const cryptoRandomString = require('crypto-random-string');

const apiKey =
  "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";
sgMail.setApiKey(apiKey);

//user registration
async function registerUser(req, res) {
  try {
    const { username, email, password, phoneNumber } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the user's password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

//view all the users
async function viewUsers(req, res) {
  try {
    const users = await User.find({ isAdmin: false });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
}

//view certain user
async function viewCertainUsers(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

//delete user
async function deleteCertainUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json("user not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

//user login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if the provided password matches the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid login details" });
    }

    // Generate a JWT token containing the user's ID
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      "your-secret-key",
      {
        expiresIn: "1hr", // Token expiration time (adjust as needed)
      }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      "your-refresh-token",
      {
        expiresIn: "365d", // Token expiration time (adjust as needed)
      }
    );

    // Convert the user document to a plain JavaScript object
    const userObject = user.toObject();

    // Remove the password field from the user object
    delete userObject.password;

    // Return the token and user object to the client
    return res.status(201).json({ user: userObject, token, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function refresh(req, res) {
  try {
    const { refreshToken } = req.body;

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, "your-refresh-token");

    // Check if the refresh token is valid
    if (decoded.userId) {
      // Generate a new access token
      const token = jwt.sign(
        { userId: decoded.userId, isAdmin: decoded.isAdmin },
        "your-secret-key",
        {
          expiresIn: "1hr", // Token expiration time (adjust as needed)
        }
      );

      // Return the new access token to the client
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updatePassword(req, res) {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if the provided old password matches the stored password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Hash the new password before saving it
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;

    // Save the changes to the database
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { default: cryptoRandomString } = await import(
      "crypto-random-string"
    );

    let resetToken;
    do {
      resetToken = cryptoRandomString({ length: 20, type: "url-safe" });
    } while (resetToken.includes('.'));

    const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    user.reset_token = resetToken;
    user.reset_token_expiration = resetTokenExpiration;

    await User.findByIdAndUpdate(user._id, {
      reset_token: resetToken,
      reset_token_expiration: resetTokenExpiration,
    });

    const resetLink = `http://localhost:5173/resetpassword/${resetToken}`;
    const msg = {
      to: email,
      from: "meetruona@gmail.com",
      subject: "Reset bucollections password",
      text: `Here is the link to reset your password: ${resetLink}`,
      html: `<strong>Here is the link to reset your password: ${resetLink}</strong>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        res.status(200).json({ message: "Reset link sent" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error sending reset link" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function resetPassword(req, res) {
  const { password, confirm_password } = req.body;
  const { reset_token } = req.params;

  if (!password || !reset_token) {
    return res.status(400).json({ message: "Token and password are required" });
  }

  try {
    const user = await User.findOne({ reset_token: reset_token });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(user._id, {
      password: passwordHash,
      reset_token: null,
    });

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  updatePassword,
  registerUser,
  viewUsers,
  viewCertainUsers,
  deleteCertainUser,
  login,
  refresh,
  forgotPassword,
  resetPassword,
};
