const express = require("express")
const {registerUser, viewUsers, login, viewCertainUsers, deleteCertainUser, refresh, updatePassword, forgotPassword, resetPassword} = require("./user.controller")
const {isAdmin, authorize, verifyPostCertainToken} = require("../../utils/requireAuth")
const {validation} = require("../../utils/validationMiddleware")
const {createUserSchema} = require("../../validations/userValidation")
const userRouter = express.Router();

userRouter.post("/register", validation(createUserSchema), registerUser);
userRouter.post("/refresh", refresh);
userRouter.post("/update-password", authorize, verifyPostCertainToken, updatePassword)
userRouter.get("/users", isAdmin, viewUsers);
userRouter.get("/users/:id",isAdmin, viewCertainUsers)
userRouter.delete("/users/:id", isAdmin, deleteCertainUser)
userRouter.post("/login", login);
userRouter.post("/forgotpassword", forgotPassword)
userRouter.post("/reset/password/:reset_token", resetPassword)

module.exports = {
    userRouter
} 

