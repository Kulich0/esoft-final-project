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
class PersonalController {
    constructor(personalService) {
        this.personalService = personalService;
    }
    PersonalRegistration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const personal_tokens = yield this.personalService.PersonalRegistration(req.body);
                res.cookie('refreshToken', personal_tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true
                });
                res.status(201).json(personal_tokens);
            }
            catch (e) {
                next(e);
            }
        });
    }
    PersonalLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personal_tokens = yield this.personalService.PersonalLogin(req.body);
                res.cookie('refreshToken', personal_tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                res.status(200).json(personal_tokens);
            }
            catch (e) {
                next(e);
            }
        });
    }
    PersonalLogout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                yield this.personalService.PersonalLogout(refreshToken);
                res.clearCookie('refreshToken');
                res.status(200).json('Успешный выход');
            }
            catch (e) {
                next(e);
            }
        });
    }
    PersonalRefresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                if (!refreshToken) {
                    return res.status(401).json('Токен обновления отсутствует');
                }
                const personal_tokens = yield this.personalService.refresh(refreshToken);
                res.cookie('refreshToken', personal_tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                res.status(200).json(personal_tokens);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getAllPersonal(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { offset, limit } = req.body;
                const pers = yield this.personalService.getAllPersonal(offset, limit);
                res.status(200).json(pers);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getPersonalById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personalId = parseInt(req.params.id, 10);
                if (isNaN(personalId)) {
                    return res.status(400).json('Неверный ID пользователя');
                }
                const pers = yield this.personalService.getPersonalById(personalId);
                if (!pers) {
                    res.status(404).json('Пользователь не найден');
                }
                else {
                    res.status(200).json(pers);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    updatePersonal(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personalId = parseInt(req.params.id, 10);
                if (isNaN(personalId)) {
                    return res.status(400).json('Неверный ID пользователя');
                }
                const updatedPersonalData = req.body;
                const pers = yield this.personalService.updatePersonal(personalId, updatedPersonalData);
                if (pers) {
                    res.status(200).json({ 'Работник обновлен': updatedPersonalData });
                }
                else {
                    res.status(404).json('Пользователь не найден');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    createRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const newPersonal = yield this.personalService.createRole(req.body);
                res.status(200).json({ 'Успешная регистрация': newPersonal });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = PersonalController;
