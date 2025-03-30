import { RequestHandler } from "express";
import newsService from "../services/news.service";



const createPost:RequestHandler = async(req,res)=>{
    try {
        
        const file = req.file

       
        

        const user = req.body.user

        
        

        const data = req.body

        
        

        const fileUrl = `http://localhost/3000/api/v1/news/uploads/${req.file?.filename}`

        console.log("this is category",data.category[0]);
        
        

        const news:news = {
            title:data?.title,
            category:data?.category,
            description:data?.description,
            language:data?.language,
            file:file,
            fileName:file?.filename as string,
            fileUrl:fileUrl
        }

        console.log(news);
        
        
        

        const result = await newsService.createPost(news,user)


        
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

const getPosts:RequestHandler = async(req,res)=>{
    try {
        
        const id = req.body.user.id

        const result = await newsService.getPosts(id)

        
        console.log(result);
        
        
        res.status(200).json({
            success:result.success,
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

const deletePost:RequestHandler = async(req,res)=>{
    try {
        const postId = parseInt(req.params.id)
        console.log(postId);
        
        const user = req.body.user

        const result = await newsService.deletePost(postId,user);

        res.status(200).json({
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

const getPost:RequestHandler = async(req,res)=>{
    try {
        
        const postId = parseInt(req.params.postId)
        const user = req.body.user

        const result = await newsService.getPost(postId,user)

        console.log(result);
        
        
        res.status(result.status).json({
            success:result.success,
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

const getNewsArticles:RequestHandler =  async(req,res)=>{
    try {

        const result = await newsService.newsArticles()

        res.status(result.status).json({
            success:result.success,
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


const getCommentsByNewsId:RequestHandler = async(req,res)=>{
    try {
        const newsId = parseInt(req.params.id)

        const result = newsService.getCommentsNewsId(newsId)

        // res.status(result.status).json({
        //     success:result.success,
        //     data:result.data
        // })

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}



export default {createPost,getPosts,deletePost,getPost,getNewsArticles,getCommentsByNewsId}