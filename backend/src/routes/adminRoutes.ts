import express from "express"
import adminController from "../controller/adminController";
import { authHandler } from "../middleware/auth";


const adminRouter = express.Router()

adminRouter.get("/getAllUsers",authHandler,adminController.getAllUsers)
adminRouter.delete("/deleteUser/:id",authHandler,adminController.deletUser)

export default adminRouter