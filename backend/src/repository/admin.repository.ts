import { Not } from "typeorm"
import datasource from "../config/connectDB"
import User_1990 from "../entities/user"
import User_3000 from "../entities/user"


const userRepo = datasource.getRepository(User_3000)

class adminRepository{
    async getAllUsers(user:any){

        if(user.role !== "admin"){
            return {success:false,status:500,message:"You are not authorised"}
        }

        const result = await userRepo.find({
            where:{
                role:Not("admin")
            },
            select:["id","userName","email","role"]
        })

        console.log(result);
        

        return {success:true,status:200,data:result}
    }

    async deleteUser(userId:any,user:any){
        if(user.role !== "admin"){
            return {success:false,status:500,message:"You are not authorised"}
        }

        const isUserExists = await userRepo.findBy({
            id:userId
        })

        if(isUserExists.length ===0){
            return {success:false,message:"Post does not exists"}
        }

        userRepo.delete(userId)

        return {success:true,status:200,message:"User deleted successfully"}
    }
}


export default new adminRepository()