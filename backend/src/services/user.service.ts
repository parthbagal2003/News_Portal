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

    async creatComment(comment:string,postId:number,userId:number){
        const data = userRepository.createComment(comment,postId,userId)

        return data
    }

    async getMyComments(userId:number){
        const data = userRepository.getMyComments(userId)

        return data
    }

    async deleteComment(commentId:number){
        const data = userRepository.deleteComment(commentId)

        return data
    }

    async likeComment(commentId:number,userId:number){
        const data = userRepository.likeComment(commentId,userId)
        return data
    }

    async dislikeComment(likeId:number){
        const data = userRepository.dislikeComment(likeId)

        return data
    }
    
}


export default new userService()