import datasource from "../config/connectDB";
import Comment_3000 from "../entities/comments";
import Comment_1990 from "../entities/comments";
import News_3000 from "../entities/news";
import User_3000 from "../entities/user";
import User_1990 from "../entities/user";
import cloudinary from "cloudinary"


const newsRepo = datasource.getRepository(News_3000)
const userRepo = datasource.getRepository(User_3000)
const commentRepo = datasource.getRepository(Comment_3000)


class newsRepository {

    async createPost(news: any, user: any) {





        if (user.role !== "admin") {
            return { success: false, status: 500, message: "You are not authorised !" }
        }



        if (!news.file || !news.category || !news.title || !news.description || !news.language) {
            return { success: false, status: 500, message: "All fields are required" }
        }

        const allowedFormats = ["image/png","image/jpg","image/webp","image/jpeg"]

        if(!allowedFormats.includes(news.file.mimetype)){
            return {success:false,status:500,message:"Invalid file type,please upload png,jpg,webp,jpeg format"}
           
        }


       
        


        const data = await newsRepo.create({
            title: news.title,
            category: news.category,
            language: news.language,
            fileName: news.fileName,
            fileUrl: news.fileUrl,
            description: news.description,
            user: user.id
        })

        await newsRepo.save(data)

        return { success: true, status: 200, message: "Post created successfully" }


    }

    async getPosts(userId: any) {


        const data = await datasource.getRepository(News_3000).findBy({
            user: userId
        })

        console.log(data);
        return { success: true, data: data }

    }

    async deletePost(postId: number,user:any) {

        if(user.role !== 'admin'){
            return {success:false,message:"You are not authorised"}
        }

        const isPostExists = await newsRepo.findBy({
            id:postId
        })

        if(isPostExists.length ===0){
            return {success:false,message:"Post does not exists"}
        }

        newsRepo.delete(postId)

        return {success:true,message:"Post deleted successfully"}
        



    }

    async getPost(postId:number){

        

        const post = await newsRepo.findOne({
            where:{
                id:postId
            }
        })

        if(!post){
            return { success: false, status: 500, message: "Post doesn't exists !" }
        }

        return {success:true,status:200,data:post}

    }
    
    async getNewsArticles(){
        const articles = await newsRepo.find({
            select:["id","fileUrl","title"]
        })

        return {success:true,status:200,data:articles}
    }


    async getCommentsByNewsId(newsId:number){
        const news = await newsRepo.findOne({
            where:{
                id:newsId
            }
        })

        if(!news){
            return { success: false, status: 500, message: "News doesn't exists !" }
        }
        // const comments = await commentRepo.find({
        //     where:{
        //         news:{
        //             id:newsId
        //         }
        //     },
        //     relations:['user'],
        //     select:["id","comment","user"]
        // })

        const comments = await commentRepo.createQueryBuilder("comment")
                                .leftJoinAndSelect("comment.user","user")
                                .where('comment.newsId = :newsId',{newsId})
                                .select(['user.userName as UserName'])
                                .getRawMany()
        console.log(comments);
        

    }

}


export default new newsRepository() 
