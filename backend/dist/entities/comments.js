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
const likes_1 = __importDefault(require("./likes"));
const user_1 = __importDefault(require("./user"));
let Comment_3000 = class Comment_3000 extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comment_3000.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment_3000.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.default, (user) => user.news, { onDelete: "NO ACTION" }),
    __metadata("design:type", user_1.default)
], Comment_3000.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => news_1.default, (news) => news.comments, { onDelete: "CASCADE" }),
    __metadata("design:type", news_1.default)
], Comment_3000.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => likes_1.default, (like) => like.user),
    __metadata("design:type", Array)
], Comment_3000.prototype, "likes", void 0);
Comment_3000 = __decorate([
    (0, typeorm_1.Entity)()
], Comment_3000);
exports.default = Comment_3000;
