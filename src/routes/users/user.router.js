const express = require("express")
const {registerUser, viewUsers, login} = require("./user.controller")

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/users", viewUsers);
userRouter.post("/login", login);

module.exports = {
    userRouter
}

