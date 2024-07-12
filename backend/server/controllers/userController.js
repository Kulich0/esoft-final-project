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
const express_validator_1 = require("express-validator");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const tokens = yield this.userService.registration(req.body);
                res.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true
                });
                res.status(201).json(tokens);
            }
            catch (e) {
                next(e);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield this.userService.login(req.body);
                res.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true
                });
                res.status(200).json(tokens);
            }
            catch (e) {
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                yield this.userService.logout(refreshToken);
                res.clearCookie('refreshToken');
                res.status(200).json({ message: 'Успешный выход' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                if (!refreshToken) {
                    return res.status(401).json({ message: 'Токен обновления отсутствует' });
                }
                const tokens = yield this.userService.refresh(refreshToken);
                res.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true
                });
                res.status(200).json(tokens);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUsers(req.body.offset, req.body.limit);
                res.status(200).json(users);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                if (isNaN(userId)) {
                    return res.status(400).json({ message: 'Неверный ID пользователя' });
                }
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    res.status(404).json({ message: 'Пользователь не найден' });
                }
                else {
                    res.status(200).json(user);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id, 10);
                if (isNaN(userId)) {
                    return res.status(400).json({ message: 'Неверный ID пользователя' });
                }
                const updatedUserData = req.body;
                const user = yield this.userService.updateUser(userId, updatedUserData);
                res.status(200).json({ message: 'Пользователь обновлен', user });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = UserController;
