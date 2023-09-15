const express = require("express")
const {registerUser, viewUsers, login, viewCertainUsers, deleteCertainUser} = require("./user.controller")
const {isAdmin, authorize} = require("../../utils/requireAuth")

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/users", isAdmin, viewUsers);
userRouter.get("/users/:id",isAdmin, viewCertainUsers)
userRouter.delete("/users/:id", isAdmin, deleteCertainUser)
userRouter.post("/login", login);

module.exports = {
    userRouter
}

