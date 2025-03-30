import { NextFunction, RequestHandler } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import datasource from "../config/connectDB.js"



dotenv.config()


export const authHandler:RequestHandler = async(req,res,next:NextFunction)=>{
    const token = req.cookies.authCookie

    
    
    

    if(!token){
        res.status(500).json({
            success:false,
            message:"You are not authenticated"
        })

        return
    }
    
    

    const data:JwtPayload|string = jwt.verify(token,process.env.SECRET_KEY as string)

   
    req.body.user = data
    
    

    next()
    

}