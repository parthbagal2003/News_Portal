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
const comments_1 = __importDefault(require("./comments"));
const user_1 = __importDefault(require("./user"));
let Like_3000 = class Like_3000 {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Like_3000.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comments_1.default, comment => comment.likes, { onDelete: "CASCADE" }),
    __metadata("design:type", comments_1.default)
], Like_3000.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.default, user => user.likes),
    __metadata("design:type", user_1.default)
], Like_3000.prototype, "user", void 0);
Like_3000 = __decorate([
    (0, typeorm_1.Entity)()
], Like_3000);
exports.default = Like_3000;
