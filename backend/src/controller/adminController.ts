import { RequestHandler } from "express";
import adminService from "../services/admin.service";



const getAllUsers: RequestHandler = async (req, res) => {
    try {

        const user = req.body.user

        const result = await adminService.getAllUsers(user)

        res.status(result.status).json({
            success: result.success,
            data: result.data
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const deletUser: RequestHandler = async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        console.log(userId);

        const user = req.body.user

        const result = await adminService.deleteUser(userId, user);

        console.log(result);
        

        res.status(result.status as number).json({
            success: result.success,
            message: result.message
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export default { getAllUsers, deletUser }