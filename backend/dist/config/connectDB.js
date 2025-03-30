"use strict";
//import { createConnection } from "typeorm";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("../entities/user"));
const comments_1 = __importDefault(require("../entities/comments"));
const likes_1 = __importDefault(require("../entities/likes"));
const news_1 = __importDefault(require("../entities/news"));
const datasource = new typeorm_1.DataSource({
    type: "mssql",
    database: "JIBE_Main_Training",
    password: "123456",
    host: "dev.c5owyuw64shd.ap-south-1.rds.amazonaws.com",
    username: "j2",
    port: 1982,
    synchronize: true,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    entities: [user_1.default, news_1.default, comments_1.default, likes_1.default],
    logging: false
});
exports.default = datasource;
