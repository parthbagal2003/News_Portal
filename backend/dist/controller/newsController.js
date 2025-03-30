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
const news_service_1 = __importDefault(require("../services/news.service"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const file = req.file;
        const user = req.body.user;
        const data = req.body;
        const fileUrl = `http://localhost/3000/api/v1/news/uploads/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
        console.log("this is category", data.category[0]);
        const news = {
            title: data === null || data === void 0 ? void 0 : data.title,
            category: data === null || data === void 0 ? void 0 : data.category,
            description: data === null || data === void 0 ? void 0 : data.description,
            language: data === null || data === void 0 ? void 0 : data.language,
            file: file,
            fileName: file === null || file === void 0 ? void 0 : file.filename,
            fileUrl: fileUrl
        };
        console.log(news);
        const result = yield news_service_1.default.createPost(news, user);
        res.status(result.status).json({
            success: result.success,
            message: result.message
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.user.id;
        const result = yield news_service_1.default.getPosts(id);
        console.log(result);
        res.status(200).json({
            success: result.success,
            data: result.data
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = parseInt(req.params.id);
        console.log(postId);
        const user = req.body.user;
        const result = yield news_service_1.default.deletePost(postId, user);
        res.status(200).json({
            success: result.success,
            message: result.message
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = parseInt(req.params.postId);
        const user = req.body.user;
        const result = yield news_service_1.default.getPost(postId, user);
        console.log(result);
        res.status(result.status).json({
            success: result.success,
            data: result.data
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
const getNewsArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield news_service_1.default.newsArticles();
        res.status(result.status).json({
            success: result.success,
            data: result.data
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
const getCommentsByNewsId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsId = parseInt(req.params.id);
        const result = news_service_1.default.getCommentsNewsId(newsId);
        // res.status(result.status).json({
        //     success:result.success,
        //     data:result.data
        // })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
exports.default = { createPost, getPosts, deletePost, getPost, getNewsArticles, getCommentsByNewsId };
