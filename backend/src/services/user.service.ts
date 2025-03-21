import userRepository from "../repository/user.repository";



class userService{

    async signUp(user:any){
        const data = userRepository.signUp(user)

        return data
    }

    async login(user:any){
        const data = userRepository.login(user)

        return data
    }

}


export default new userService()