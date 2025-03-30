import adminRepository from "../repository/admin.repository"


class adminService{
    async getAllUsers(user:any){
        const result = adminRepository.getAllUsers(user)

        return result
    }

    async deleteUser(userId:number,user:any){
        const result = adminRepository.deleteUser(userId,user)

        return result
    }
}


export default new adminService()