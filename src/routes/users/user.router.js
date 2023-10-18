const express = require("express")
const {registerUser, viewUsers, login, viewCertainUsers, deleteCertainUser, refresh} = require("./user.controller")
const {isAdmin, authorize} = require("../../utils/requireAuth")
const {validation} = require("../../utils/validationMiddleware")
const {createUserSchema} = require("../../validations/userValidation")
const userRouter = express.Router();

userRouter.post("/register", validation(createUserSchema), registerUser);
userRouter.post("/refresh", refresh);
userRouter.get("/users", isAdmin, viewUsers);
userRouter.get("/users/:id",isAdmin, viewCertainUsers)
userRouter.delete("/users/:id", isAdmin, deleteCertainUser)
userRouter.post("/login", login);

module.exports = {
    userRouter
}

