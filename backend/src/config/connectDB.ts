//import { createConnection } from "typeorm";

import { DataSource } from "typeorm"
import User_2029 from "../entities/user"





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
    entities:[User_2029],
    logging:false
})

export default datasource
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

    