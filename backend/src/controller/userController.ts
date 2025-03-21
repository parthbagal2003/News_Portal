import { CookieOptions, RequestHandler } from "express";
import userService from "../services/user.service";
import jwt from "jsonwebtoken"

const signUp:RequestHandler = async(req,res)=>{
    try {
        const user = req.body

        if(!user?.userName || !user?.email || !user?.password){
            res.status(500).json({
                success:false,
                message:"All fields are required"
            })

            return
        }


        const result = await userService.signUp(user)



        
        res.status(result.status).json({
            success:result.success,
            message:result.message
        })
        



    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        
    }
}

const login:RequestHandler =  async(req,res)=>{
    try {
        const user = req.body

        if(!user?.email || !user?.password){
            res.status(500).json({
                success:false,
                message:"All fields are required"
            })

            return
        }

        const result = await userService.login(user)
        const payload = {
            id:result.data?.id,
            email:result.data?.email
        }

        const token:string =  jwt.sign(payload,process.env.SECRET_KEY as string,{
            expiresIn:"2d"
        })

        const options:CookieOptions = {
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            expires:new Date(Date.now() + 2*24*60*60*1000)
        }




        
        
       
        
        res.cookie("authCookie",token,options)
        

        res.status(200).json({
            success:true,
            user:{
                id:result.data?.id,
                name:result.data?.userName,
                email:result.data?.email
            },
            message:"Successfuly login"  
        })


    } catch (error) {

        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        
    }
}




export default {signUp,login}