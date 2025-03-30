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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect_cloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const connect_cloudinary = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cloudinary_1.v2.config({
            cloud_name: process.env.Cloudinary_client,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        console.log("Connected to cloudinary");
    }
    catch (error) {
        console.log(error);
    }
});
exports.connect_cloudinary = connect_cloudinary;
