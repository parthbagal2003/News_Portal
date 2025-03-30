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
const news_repository_1 = __importDefault(require("../repository/news.repository"));
class newsService {
    createPost(news, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield news_repository_1.default.createPost(news, user);
            return data;
        });
    }
    getPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield news_repository_1.default.getPosts(userId);
            return data;
        });
    }
    deletePost(postId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield news_repository_1.default.deletePost(postId, user);
            return result;
        });
    }
    getPost(postId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield news_repository_1.default.getPost(postId);
            return result;
        });
    }
    newsArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield news_repository_1.default.getNewsArticles();
            return result;
        });
    }
    getCommentsNewsId(newsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = news_repository_1.default.getCommentsByNewsId(newsId);
            return result;
        });
    }
}
exports.default = new newsService;
