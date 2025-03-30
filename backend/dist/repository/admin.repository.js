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
const typeorm_1 = require("typeorm");
const connectDB_1 = __importDefault(require("../config/connectDB"));
const user_1 = __importDefault(require("../entities/user"));
const userRepo = connectDB_1.default.getRepository(user_1.default);
class adminRepository {
    getAllUsers(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role !== "admin") {
                return { success: false, status: 500, message: "You are not authorised" };
            }
            const result = yield userRepo.find({
                where: {
                    role: (0, typeorm_1.Not)("admin")
                },
                select: ["id", "userName", "email", "role"]
            });
            console.log(result);
            return { success: true, status: 200, data: result };
        });
    }
    deleteUser(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.role !== "admin") {
                return { success: false, status: 500, message: "You are not authorised" };
            }
            const isUserExists = yield userRepo.findBy({
                id: userId
            });
            if (isUserExists.length === 0) {
                return { success: false, message: "Post does not exists" };
            }
            userRepo.delete(userId);
            return { success: true, status: 200, message: "User deleted successfully" };
        });
    }
}
exports.default = new adminRepository();
