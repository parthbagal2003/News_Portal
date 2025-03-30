"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../controller/adminController"));
const auth_1 = require("../middleware/auth");
const adminRouter = express_1.default.Router();
adminRouter.get("/getAllUsers", auth_1.authHandler, adminController_1.default.getAllUsers);
adminRouter.delete("/deleteUser/:id", auth_1.authHandler, adminController_1.default.deletUser);
exports.default = adminRouter;
