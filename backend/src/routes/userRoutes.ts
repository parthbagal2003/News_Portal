import express from "express"
import userController from "../controller/userController"
import { authHandler } from "../middleware/auth"

const userRoute = express.Router()


userRoute.post("/signUp",userController.signUp)
userRoute.post("/login",userController.login)
userRoute.post("/comment",authHandler,userController.createComment),
userRoute.get("/myComments",authHandler,userController.getMycomments)
userRoute.delete("/deleteComment",authHandler,userController.deleteComment)
userRoute.post("/likeComment",authHandler,userController.likeComment)
userRoute.delete("/dislikeComment",authHandler,userController.dislikeComment)


export {userRoute}

