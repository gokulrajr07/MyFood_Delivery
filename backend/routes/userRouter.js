import express from "express";
import {loginUser,registerUser} from "../controllers/userControllers.js"

let userRouter=express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)

export default userRouter; 