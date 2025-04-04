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
const user_repository_1 = __importDefault(require("../repository/user.repository"));
class userService {
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = user_repository_1.default.signUp(user);
            return data;
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = user_repository_1.default.login(user);
            return data;
        });
    }
    creatComment(comment, postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = user_repository_1.default.createComment(comment, postId, userId);
            return data;
        });
    }
    getMyComments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = user_repository_1.default.getMyComments(userId);
            return data;
        });
    }
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = user_repository_1.default.deleteComment(commentId);
            return data;
        });
    }
    likeComment(commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = user_repository_1.default.likeComment(commentId, userId);
            return data;
        });
    }
    dislikeComment(likeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = user_repository_1.default.dislikeComment(likeId);
            return data;
        });
    }
}
exports.default = new userService();
