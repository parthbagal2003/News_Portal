
import multer from "multer";
import express from "express"
import newsController from "../controller/newsController";
import { authHandler } from "../middleware/auth";

const newsRouter = express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  newsRouter.post("/createPost",upload.single('file'),authHandler,newsController.createPost)
  newsRouter.get("/getPosts",authHandler,newsController.getPosts)
  newsRouter.get("/getPost/post/:postId",newsController.getPost)
  newsRouter.delete("/deletePost/:id",authHandler,newsController.deletePost)
  newsRouter.get("/getNewsArticles",newsController.getNewsArticles)
  newsRouter.get("/getCommentsNewsId/:id",newsController.getCommentsByNewsId)


  export  {newsRouter}


