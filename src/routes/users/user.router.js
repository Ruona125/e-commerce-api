const express = require("express")
const {registerUser, viewUsers} = require("./user.controller")

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/users", viewUsers);

module.exports = {
    userRouter
}

