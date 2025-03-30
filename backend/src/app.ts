import express from "express"
import datasource from "./config/connectDB";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/userRoutes";
import { newsRouter } from "./routes/newsRouts";
import cors from "cors"
import adminRouter from "./routes/adminRoutes";
import cloudinary from "cloudinary"
import fileUpload from "express-fileupload";


const app = express()


app.use(cors({
    origin:"http://localhost:4200",
    credentials:true
}))



app.use(express.json())

app.use(cookieParser())



app.use("/api/v1/user",userRoute)
app.use("/api/v1/news",newsRouter)
app.use("/api/v1/admin",adminRouter)

datasource.initialize().then(()=>{
    console.log("Database connected successfully");
    
}).catch((error)=>{
    console.log(error);
    
})



app.listen(3000,()=>{
    console.log("App is listening on port 3000");
    
})

