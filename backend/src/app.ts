import express from "express"
import datasource from "./config/connectDB";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/userRoutes";

const app = express()


app.use(express.json())

app.use(cookieParser())



datasource.initialize().then(()=>{
    console.log("Database connected successfully");
    
}).catch((error)=>{
    console.log(error);
    
})

app.listen(3000,()=>{
    console.log("App is listening on port 3000");
    
})

app.use("/api/v1/user",userRoute)