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
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenService_1 = __importDefault(require("../services/tokenService"));
const userdto_1 = __importDefault(require("../userdto/userdto"));
require('dotenv').config();
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    registration(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield this.userModel.findByEmail(userData.email);
            if (candidate) {
                throw new Error(`Пользователь с такой почтой ${userData.email} уже существует`);
            }
            const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
            const hashPassword = yield bcrypt_1.default.hash(userData.password, saltRounds);
            const newUserData = {
                name: userData.name,
                email: userData.email,
                password: hashPassword
            };
            yield this.userModel.create(newUserData);
            const user = yield this.userModel.findByEmail(userData.email);
            if (!user) {
                throw new Error('Ошибка при создании пользователя');
            }
            const tokens = tokenService_1.default.generateTokens({
                userId: user.id,
                name: user.name
            });
            yield tokenService_1.default.saveToken(user.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, user: new userdto_1.default(user) });
        });
    }
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findByEmail(userData.email);
            if (user && (yield bcrypt_1.default.compare(userData.password, user.password))) {
                const tokens = tokenService_1.default.generateTokens({ userId: user.id });
                yield tokenService_1.default.saveToken(user.id, tokens.refreshToken);
                return Object.assign(Object.assign({}, tokens), { user: new userdto_1.default(user) });
            }
            else {
                throw new Error('Неверный пароль или email');
            }
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return tokenService_1.default.removeToken(refreshToken);
        });
    }
    getAllUsers(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.getAll(offset, limit);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.getById(userId);
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw new Error('Refresh token отсутствует');
            }
            const userData = tokenService_1.default.validateRefreshToken(refreshToken) || null;
            if (!userData) {
                throw new Error('Невалидный refresh token');
            }
            const tokenDb = yield tokenService_1.default.findToken(userData.userId);
            if (!tokenDb) {
                throw new Error('Refresh token не найден в базе данных');
            }
            const user = yield this.userModel.getById(userData.userId);
            if (!user) {
                throw new Error('Пользователь не найден');
            }
            const tokens = tokenService_1.default.generateTokens({ userId: user.id });
            yield tokenService_1.default.saveToken(user.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: new userdto_1.default(user) });
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            let hashPassword = '';
            if (userData.password) {
                hashPassword = yield bcrypt_1.default.hash(userData.password, Number(process.env.BCRYPT_SALT_ROUNDS));
            }
            const newUserData = Object.assign(Object.assign(Object.assign({}, (userData.name && { name: userData.name })), (userData.email && { email: userData.email })), (userData.password && { password: hashPassword }));
            return this.userModel.update(id, newUserData);
        });
    }
}
exports.default = UserService;
