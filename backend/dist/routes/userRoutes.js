"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const auth_1 = require("../middleware/auth");
const userRoute = express_1.default.Router();
exports.userRoute = userRoute;
userRoute.post("/signUp", userController_1.default.signUp);
userRoute.post("/login", userController_1.default.login);
userRoute.post("/comment", auth_1.authHandler, userController_1.default.createComment),
    userRoute.get("/myComments", auth_1.authHandler, userController_1.default.getMycomments);
userRoute.delete("/deleteComment", auth_1.authHandler, userController_1.default.deleteComment);
userRoute.post("/likeComment", auth_1.authHandler, userController_1.default.likeComment);
userRoute.delete("/dislikeComment", auth_1.authHandler, userController_1.default.dislikeComment);
