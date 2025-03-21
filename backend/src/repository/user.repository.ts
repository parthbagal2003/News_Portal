import { CookieOptions, RequestHandler } from "express";
import datasource from "../config/connectDB";
import User_2029 from "../entities/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const userRepo = datasource.getRepository(User_2029)

class userRepository{

    async signUp(user:any){


        const isUserPresent = await userRepo.findBy({
            email:user?.email
        })

        console.log(isUserPresent.length);
        

        if(isUserPresent?.length !== 0){
            return {success:false,status:500,message:"Email already exist"}
        }



        const hashedPassword = await bcrypt.hash(user.password,9)

        const data = await userRepo.create({
            userName:user.userName,
            email:user.email,
            password:hashedPassword
        })

        console.log(data);
        

        return {success:true,status:200,message:"Registered Successfully"}


    }

    async login(user:any){

        const isUserPresent = await userRepo.findBy({
            email:user?.email
        })

        if(isUserPresent?.length !== 0){
            return {success:false,status:500,message:"User doesn't exists"}
        }

        const isPasswordCorrect = await bcrypt.compare(user.password,isUserPresent[0].password)

        if(!isPasswordCorrect){
            return {success:true,status:500,message:"Incorrect password"}
        }

       const presentUser = {
        id:isUserPresent[0].id,
        userName:isUserPresent[0].userName,
        email:isUserPresent[0].email
       }

        return {data:presentUser,success:true}

        



    }

}


export default new userRepository()