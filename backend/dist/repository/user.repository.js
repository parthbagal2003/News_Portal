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
const likes_1 = __importDefault(require("../entities/likes"));
const news_1 = __importDefault(require("../entities/news"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../entities/user"));
const comments_2 = __importDefault(require("../entities/comments"));
const likes_2 = __importDefault(require("../entities/likes"));
dotenv_1.default.config();
const userRepo = connectDB_1.default.getRepository(user_1.default);
const commentRepo = connectDB_1.default.getRepository(comments_2.default);
const newsRepo = connectDB_1.default.getRepository(news_1.default);
const likeRepo = connectDB_1.default.getRepository(likes_2.default);
class userRepository {
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUserPresent = yield userRepo.findBy({
                email: user === null || user === void 0 ? void 0 : user.email
            });
            console.log(isUserPresent.length);
            console.log(isUserPresent);
            if ((isUserPresent === null || isUserPresent === void 0 ? void 0 : isUserPresent.length) !== 0) {
                return { success: false, status: 500, message: "Email already exist" };
            }
            console.log(user.passowrd, user.confimPassword);
            if (user.password !== user.confirmPassword) {
                return { success: false, status: 500, message: "Please check password and confimpassword" };
            }
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, 9);
            const data = yield userRepo.create({
                userName: user.userName,
                email: user.email,
                password: hashedPassword,
                role: user.role
            });
            yield userRepo.save(data);
            console.log(data);
            return { success: true, status: 200, message: "Registered Successfully" };
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUserPresent = yield userRepo.findBy({
                email: user === null || user === void 0 ? void 0 : user.email
            });
            console.log(isUserPresent.length);
            if ((isUserPresent === null || isUserPresent === void 0 ? void 0 : isUserPresent.length) === 0) {
                return { success: false, status: 500, message: "User doesn't exists" };
            }
            const isPasswordCorrect = yield bcryptjs_1.default.compare(user.password, isUserPresent[0].password);
            if (!isPasswordCorrect) {
                return { success: true, status: 500, message: "Incorrect password" };
            }
            const presentUser = {
                id: isUserPresent[0].id,
                userName: isUserPresent[0].userName,
                email: isUserPresent[0].email,
                role: isUserPresent[0].role
            };
            return { data: presentUser, success: true };
        });
    }
    createComment(comment, newsId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const news = yield newsRepo.findOne({
                where: {
                    id: newsId
                }
            });
            if (!news) {
                return { success: false, status: 500, message: "News article doesn't exists" };
            }
            const user = yield userRepo.findOne({
                where: {
                    id: userId
                }
            });
            if (!user) {
                return { success: false, status: 500, message: "User doesn't exists" };
            }
            const createcomment = new comments_1.default();
            createcomment.comment = comment;
            createcomment.news = news;
            createcomment.user = user;
            createcomment.save();
            return { success: true, status: 200, message: "Commented" };
        });
    }
    getMyComments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(userId);
            const myComments = yield commentRepo.createQueryBuilder('comment')
                .leftJoinAndSelect("comment.news", "news")
                .where("comment.userId = :userId", { userId })
                .select(["news.title"])
                .getRawMany();
            console.log(myComments.length);
            if (myComments.length === 0) {
                return { success: true, status: 200, message: "Not commented yet !" };
            }
            return { success: true, status: 200, message: "Comments fetched Successfully", data: myComments };
        });
    }
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield commentRepo.findOne({
                where: {
                    id: commentId
                }
            });
            if (!comment) {
                return { success: false, status: 500, message: "Comment doesn't exists" };
            }
            commentRepo.delete(commentId);
            return { success: true, status: 200, message: "Comment deleted !" };
        });
    }
    likeComment(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield commentRepo.findOne({
                where: {
                    id: commentId
                }
            });
            const user = yield userRepo.findOne({
                where: {
                    id: userId
                }
            });
            const like = new likes_1.default();
            like.comment = comment;
            like.user = user;
            likeRepo.save(like);
            return { success: true, status: 200, message: "Liked !" };
        });
    }
    dislikeComment(likeId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(likeId);
            const like = yield likeRepo.findOne({
                where: {
                    id: likeId
                }
            });
            console.log(like);
            if (!like) {
                return { success: false, status: 500, message: "You have not liked this comment" };
            }
            likeRepo.delete(likeId);
            return { success: true, status: 200, message: " Disliked !" };
        });
    }
}
exports.default = new userRepository();
