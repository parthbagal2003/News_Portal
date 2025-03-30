
import datasource from "../config/connectDB";
import Comment_1990 from "../entities/comments";
import Like_1990 from "../entities/likes";
import News_3000 from "../entities/news";
import User_1990 from "../entities/user";
import bcrypt from "bcryptjs"

import dotenv from "dotenv"
import User_3000 from "../entities/user";
import Comment_3000 from "../entities/comments";
import Like_3000 from "../entities/likes";

dotenv.config()

const userRepo = datasource.getRepository(User_3000)
const commentRepo = datasource.getRepository(Comment_3000)
const newsRepo = datasource.getRepository(News_3000)
const likeRepo = datasource.getRepository(Like_3000)

class userRepository{

    async signUp(user:any){


        const isUserPresent = await userRepo.findBy({
            email:user?.email
        })

        console.log(isUserPresent.length);
        
        console.log(isUserPresent); 
        

        if(isUserPresent?.length !== 0){
            return {success:false,status:500,message:"Email already exist"}
        }

        console.log(user.passowrd,user.confimPassword);
        
        if(user.password !== user.confirmPassword){
            return {success:false,status:500,message:"Please check password and confimpassword"}
        }



        const hashedPassword = await bcrypt.hash(user.password,9)

        const data = await userRepo.create({
            userName:user.userName,
            email:user.email,
            password:hashedPassword,
            role:user.role
        })

        await userRepo.save(data)

        console.log(data);
        

        return {success:true,status:200,message:"Registered Successfully"}


    }

    async login(user:any){

        const isUserPresent = await userRepo.findBy({
            email:user?.email
        })

        console.log(isUserPresent.length);
        

        if(isUserPresent?.length === 0){
            return {success:false,status:500,message:"User doesn't exists"}
        }

        const isPasswordCorrect = await bcrypt.compare(user.password,isUserPresent[0].password)

        if(!isPasswordCorrect){
            return {success:true,status:500,message:"Incorrect password"}
        }

       const presentUser = {
        id:isUserPresent[0].id,
        userName:isUserPresent[0].userName,
        email:isUserPresent[0].email,
        role:isUserPresent[0].role
       }

        return {data:presentUser,success:true}

        



    }

    async createComment(comment:string,newsId:number,userId:number){

        const news = await newsRepo.findOne({
            where:{
                id:newsId
            }
        })

        if(!news){
            return {success:false,status:500,message:"News article doesn't exists"}
        }

        const user = await userRepo.findOne({
            where:{
                id:userId
            }
        })

        if(!user){
            return {success:false,status:500,message:"User doesn't exists"}
        }


        const  createcomment = new Comment_1990()

        createcomment.comment = comment
        createcomment.news = news as News_3000
        createcomment.user = user as User_1990

        createcomment.save()

        return {success:true,status:200,message:"Commented"}
        

         
    }

    async getMyComments(userId:number){

        console.log(userId);
        
        const myComments = await commentRepo.createQueryBuilder('comment')
                                .leftJoinAndSelect("comment.news","news")
                                .where("comment.userId = :userId",{userId})
                                .select(["news.title"])
                                .getRawMany()

        console.log(myComments.length)
        

        if(myComments.length === 0){
            return {success:true,status:200,message:"Not commented yet !"}
        }

        return {success:true,status:200,message:"Comments fetched Successfully",data:myComments}
    }

    async deleteComment(commentId:number){
        const comment = await commentRepo.findOne({
            where:{
                id:commentId
            }
        })

        if(!comment){
            return {success:false,status:500,message:"Comment doesn't exists"}
        }

        commentRepo.delete(commentId)


        return {success:true,status:200,message:"Comment deleted !"}
    }

    async likeComment(commentId:number,userId:number){
        const comment = await commentRepo.findOne({
            where:{
                id:commentId
            }
        })

        const user = await userRepo.findOne({
            where:{
                id:userId
            }
        })

        const like = new Like_1990()

        like.comment = comment as Comment_1990
        like.user = user as User_1990

        likeRepo.save(like)

        return {success:true,status:200,message:"Liked !"}

    }

    async dislikeComment(likeId:number){
        console.log(likeId);
        
        const like = await likeRepo.findOne({
            where:{
                id:likeId
            }
        })

        console.log(like);
        

        
        if(!like){
            return {success:false,status:500,message:"You have not liked this comment"}
        }

        likeRepo.delete(likeId)
    
        

        return {success:true,status:200,message:" Disliked !"}

    }

}


export default new userRepository()