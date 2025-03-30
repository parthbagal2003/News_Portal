import newsRepository from "../repository/news.repository";


class newsService{
    async createPost(news:news,user:any){
        const data = await newsRepository.createPost(news,user)
        return data



    }

    async getPosts(userId:number){

        const data = await newsRepository.getPosts(userId)

        return data

    }

    async deletePost(postId:number,user:any){
        const result = await newsRepository.deletePost(postId,user)

        return result
    }

    async getPost(postId:number,user:any){
        const result = await newsRepository.getPost(postId)

        return result
    }

    async newsArticles(){
        const result = await newsRepository.getNewsArticles()

        return result
    }

    async getCommentsNewsId(newsId:number){
        const result =  newsRepository.getCommentsByNewsId(newsId)

        return result
    }
}

export default new newsService