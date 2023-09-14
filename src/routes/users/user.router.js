const express = require("express")
const {registerUser, viewUsers, login, viewCertainUsers, deleteCertainUser} = require("./user.controller")

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/users", viewUsers);
userRouter.get("/users/:id", viewCertainUsers)
userRouter.delete("/users/:id", deleteCertainUser)
userRouter.post("/login", login);

module.exports = {
    userRouter
}

