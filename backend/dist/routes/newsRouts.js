"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsRouter = void 0;
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const newsController_1 = __importDefault(require("../controller/newsController"));
const auth_1 = require("../middleware/auth");
const newsRouter = express_1.default.Router();
exports.newsRouter = newsRouter;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
newsRouter.post("/createPost", upload.single('file'), auth_1.authHandler, newsController_1.default.createPost);
newsRouter.get("/getPosts", auth_1.authHandler, newsController_1.default.getPosts);
newsRouter.get("/getPost/post/:postId", newsController_1.default.getPost);
newsRouter.delete("/deletePost/:id", auth_1.authHandler, newsController_1.default.deletePost);
newsRouter.get("/getNewsArticles", newsController_1.default.getNewsArticles);
newsRouter.get("/getCommentsNewsId/:id", newsController_1.default.getCommentsByNewsId);
