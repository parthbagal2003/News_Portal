//import { createConnection } from "typeorm";

import { DataSource } from "typeorm"

import User_1990 from "../entities/user"
import Comment_1990 from "../entities/comments"
import Like_1990 from "../entities/likes"

import News_Jibe from "../entities/news"





const datasource = new DataSource({
    type:"mssql",
    database:"JIBE_Main_Training",
    password:"123456",
    host:"dev.c5owyuw64shd.ap-south-1.rds.amazonaws.com",
    username:"j2",
    port:1982,
    synchronize:true,
    options:{
        encrypt:true,
        trustServerCertificate:true,
        enableArithAbort:true
    },
    entities:[User_1990,News_Jibe,Comment_1990,Like_1990],
    logging:false
})

export default datasource
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

    