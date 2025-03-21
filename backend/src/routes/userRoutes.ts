import express from "express"
import userController from "../controller/userController"

const userRoute = express.Router()


userRoute.post("/signUp",userController.signUp)


export {userRoute}

