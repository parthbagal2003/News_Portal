"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = require("./routes/userRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
connectDB_1.default.initialize().then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.log(error);
});
app.listen(3000, () => {
    console.log("App is listening on port 3000");
});
app.use("/api/v1/user", userRoutes_1.userRoute);
