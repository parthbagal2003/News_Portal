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
const user_service_1 = __importDefault(require("../services/user.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        console.log(user);
        if (!(user === null || user === void 0 ? void 0 : user.userName) || !(user === null || user === void 0 ? void 0 : user.email) || !(user === null || user === void 0 ? void 0 : user.password) || !user.role) {
            res.status(500).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }
        const result = yield user_service_1.default.signUp(user);
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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const user = req.body;
        console.log(user);
        if (!(user === null || user === void 0 ? void 0 : user.email) || !(user === null || user === void 0 ? void 0 : user.password)) {
            res.status(500).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }
        const result = yield user_service_1.default.login(user);
        const payload = {
            id: (_a = result.data) === null || _a === void 0 ? void 0 : _a.id,
            role: (_b = result.data) === null || _b === void 0 ? void 0 : _b.role
        };
        console.log(process.env.SECRET_KEY);
        const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "2d"
        });
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        };
        res.cookie("authCookie", token, options);
        // console.log(result);
        res.status(200).json({
            success: true,
            user: {
                name: (_c = result.data) === null || _c === void 0 ? void 0 : _c.userName,
                email: (_d = result.data) === null || _d === void 0 ? void 0 : _d.email,
                role: (_e = result.data) === null || _e === void 0 ? void 0 : _e.role
            },
            message: "Successfuly login"
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
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const data = req.body;
        const userId = req.body.user.id;
        const result = yield user_service_1.default.creatComment(data.comment, data.postId, userId);
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
const getMycomments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user.id;
        const result = yield user_service_1.default.getMyComments(userId);
        res.status(result.status).json({
            success: result.success,
            message: result.message,
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
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.body.id;
        const result = yield user_service_1.default.deleteComment(commentId);
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
const likeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentId = req.body.id;
        const userId = req.body.user.id;
        const result = yield user_service_1.default.likeComment(commentId, userId);
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
const dislikeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const result = yield user_service_1.default.dislikeComment(id);
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
exports.default = { signUp, login, createComment, getMycomments, deleteComment, likeComment, dislikeComment };
