import { CookieOptions, RequestHandler } from "express";
import userService from "../services/user.service";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const signUp:RequestHandler = async(req,res)=>{
    try {
        const user = req.body

        console.log(user);
        

        if(!user?.userName || !user?.email || !user?.password || !user.role){
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

        console.log(user);
        

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
            role:result.data?.role
        }

        console.log(process.env.SECRET_KEY);
        

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

        // console.log(result);
        
        

        res.status(200).json({
            success:true,
            user:{
                name:result.data?.userName,
                email:result.data?.email,
                role:result.data?.role
            },
            message:"Successfuly login"  
        })


    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        
    }
}

const createComment:RequestHandler = async(req,res)=>{
    try {
        console.log(req.body);
        
        const data = req.body
        const userId = req.body.user.id

        const result = await userService.creatComment(data.comment,data.postId,userId)

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


const getMycomments:RequestHandler = async(req,res)=>{
    try {
        const userId = req.body.user.id
        const result = await userService.getMyComments(userId)

        res.status(result.status).json({
            success:result.success,
            message:result.message,
            data:result.data
        })


    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const deleteComment:RequestHandler=async(req,res)=>{
    try {
        const commentId = req.body.id

        const result = await userService.deleteComment(commentId)

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


const likeComment:RequestHandler=async(req,res)=>{
    try {
        const commentId = req.body.id
        const userId = req.body.user.id
        const result = await userService.likeComment(commentId,userId)

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


const dislikeComment:RequestHandler = async(req,res)=>{
    try {
        const id = req.body.id

        const result = await userService.dislikeComment(id)

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






export default {signUp,login,createComment,getMycomments,deleteComment,likeComment,dislikeComment}