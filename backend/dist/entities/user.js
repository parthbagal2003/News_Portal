"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const news_1 = __importDefault(require("./news"));
const comments_1 = __importDefault(require("./comments"));
const likes_1 = __importDefault(require("./likes"));
let User_3000 = class User_3000 extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User_3000.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User_3000.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User_3000.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User_3000.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: ["admin", "user"]
    }),
    __metadata("design:type", String)
], User_3000.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => news_1.default, (news) => news.user),
    __metadata("design:type", Array)
], User_3000.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_1.default, (comment) => comment.user),
    __metadata("design:type", Array)
], User_3000.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => likes_1.default, (like) => like.user),
    __metadata("design:type", Array)
], User_3000.prototype, "likes", void 0);
User_3000 = __decorate([
    (0, typeorm_1.Entity)()
], User_3000);
exports.default = User_3000;
