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
const user_1 = __importDefault(require("../entities/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepo = connectDB_1.default.getRepository(user_1.default);
class userRepository {
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUserPresent = yield userRepo.findBy({
                email: user === null || user === void 0 ? void 0 : user.email
            });
            console.log(isUserPresent.length);
            if ((isUserPresent === null || isUserPresent === void 0 ? void 0 : isUserPresent.length) !== 0) {
                return { success: false, status: 500, message: "Email already exist" };
            }
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, 9);
            const data = yield userRepo.create({
                userName: user.userName,
                email: user.email,
                password: hashedPassword
            });
            console.log(data);
            return { success: true, status: 200, message: "Registered Successfully" };
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new userRepository();
