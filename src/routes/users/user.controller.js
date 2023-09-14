const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { User } = require("../../models/userModels");

//user registration
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the user's password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, email, password:hashedPassword });

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
    const users = await User.find({});
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
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "invalid Login details" });
    }

    // Generate a JWT token containing the user's ID
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, "your-secret-key", {
      expiresIn: "1h", // Token expiration time (adjust as needed)
    });
    
    //this is to check what's stored in the token
    // const decode = jwt.decode(token)
    // console.log(decode.isAdmin) 

    // Return the token to the client
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  registerUser,
  viewUsers,
  viewCertainUsers,
  deleteCertainUser,
  login,
};
