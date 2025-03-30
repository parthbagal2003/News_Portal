"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDB_1 = __importDefault(require("../config/connectDB"));
const comments_1 = __importDefault(require("../entities/comments"));
const news_1 = __importDefault(require("../entities/news"));
const user_1 = __importDefault(require("../entities/user"));
const newsRepo = connectDB_1.default.getRepository(news_1.default);
const userRepo = connectDB_1.default.getRepository(user_1.default);
const commentRepo = connectDB_1.default.getRepository(comments_1.default);
class newsRepository {
    createPost(news, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role !== "admin") {
                return { success: false, status: 500, message: "You are not authorised !" };
            }
            if (!news.file || !news.category || !news.title || !news.description || !news.language) {
                return { success: false, status: 500, message: "All fields are required" };
            }
            const allowedFormats = ["image/png", "image/jpg", "image/webp", "image/jpeg"];
            if (!allowedFormats.includes(news.file.mimetype)) {
                return { success: false, status: 500, message: "Invalid file type,please upload png,jpg,webp,jpeg format" };
            }
            const data = yield newsRepo.create({
                title: news.title,
                category: news.category,
                language: news.language,
                fileName: news.fileName,
                fileUrl: news.fileUrl,
                description: news.description,
                user: user.id
            });
            yield newsRepo.save(data);
            return { success: true, status: 200, message: "Post created successfully" };
        });
    }
    getPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield connectDB_1.default.getRepository(news_1.default).findBy({
                user: userId
            });
            console.log(data);
            return { success: true, data: data };
        });
    }
    deletePost(postId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role !== 'admin') {
                return { success: false, message: "You are not authorised" };
            }
            const isPostExists = yield newsRepo.findBy({
                id: postId
            });
            if (isPostExists.length === 0) {
                return { success: false, message: "Post does not exists" };
            }
            newsRepo.delete(postId);
            return { success: true, message: "Post deleted successfully" };
        });
    }
    getPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield newsRepo.findOne({
                where: {
                    id: postId
                }
            });
            if (!post) {
                return { success: false, status: 500, message: "Post doesn't exists !" };
            }
            return { success: true, status: 200, data: post };
        });
    }
    getNewsArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            const articles = yield newsRepo.find({
                select: ["id", "fileUrl", "title"]
            });
            return { success: true, status: 200, data: articles };
        });
    }
    getCommentsByNewsId(newsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const news = yield newsRepo.findOne({
                where: {
                    id: newsId
                }
            });
            if (!news) {
                return { success: false, status: 500, message: "News doesn't exists !" };
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
            const comments = yield commentRepo.createQueryBuilder("comment")
                .leftJoinAndSelect("comment.user", "user")
                .where('comment.newsId = :newsId', { newsId })
                .select(['user.userName as UserName'])
                .getRawMany();
            console.log(comments);
        });
    }
}
exports.default = new newsRepository();
