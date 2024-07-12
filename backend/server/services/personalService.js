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
const tokenPersonalService_1 = __importDefault(require("../services/tokenPersonalService"));
const persdto_1 = __importDefault(require("../userdto/persdto"));
require('dotenv').config();
class PersonalService {
    constructor(personalModel, rolesModel) {
        this.personalModel = personalModel;
        this.rolesModel = rolesModel;
    }
    PersonalRegistration(personalData) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield this.personalModel.findByEmail(personalData.email);
            if (candidate) {
                throw new Error(`Работник с такой почтой ${personalData.email} уже существует`);
            }
            const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
            const hashPassword = yield bcrypt_1.default.hash(personalData.password, saltRounds);
            const newPersonalData = {
                persname: personalData.persname,
                email: personalData.email,
                password: hashPassword,
                role_id: Number(process.env.DEFAULT_ROLE_ID)
            };
            yield this.personalModel.create(newPersonalData);
            const pers = yield this.personalModel.findByEmail(personalData.email);
            const role = yield this.rolesModel.findById(pers.roleId);
            if (!pers) {
                throw new Error('Ошибка при создании работника');
            }
            const personal_tokens = tokenPersonalService_1.default.generateTokens({
                personalId: pers.id,
                persname: pers.persname,
                role: role.name
            });
            yield tokenPersonalService_1.default.saveToken(pers.id, personal_tokens.refreshToken);
            return Object.assign(Object.assign({}, personal_tokens), { pers: new persdto_1.default(pers) });
        });
    }
    createRole(personalData) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield this.personalModel.findByEmail(personalData.email);
            if (candidate) {
                throw new Error(`Работник с такой почтой ${personalData.email} уже существует`);
            }
            else {
                const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
                const hashPassword = yield bcrypt_1.default.hash(personalData.password, saltRounds);
                const newPersonalData = {
                    persname: personalData.persname,
                    email: personalData.email,
                    password: hashPassword,
                    roleId: personalData.role_id ? personalData.role_id : Number(process.env.DEFAULT_ROLE_ID),
                };
                this.personalModel.createRole(newPersonalData);
            }
        });
    }
    PersonalLogin(personalData) {
        return __awaiter(this, void 0, void 0, function* () {
            const pers = yield this.personalModel.findByEmail(personalData.email);
            if (pers && (yield bcrypt_1.default.compare(personalData.password, pers.password))) {
                const personal_tokens = tokenPersonalService_1.default.generateTokens({ personalId: pers.id });
                yield tokenPersonalService_1.default.saveToken(pers.id, personal_tokens.refreshToken);
                return Object.assign(Object.assign({}, personal_tokens), { pers: new persdto_1.default(pers) });
            }
            else {
                throw new Error('Неверный пароль или email');
            }
        });
    }
    PersonalLogout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return tokenPersonalService_1.default.removeToken(refreshToken);
        });
    }
    getAllPersonal(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.personalModel.getAll(offset, limit);
        });
    }
    getPersonalById(personalId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.personalModel.getById(personalId);
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw new Error('Refresh token отсутствует');
            }
            const personalData = tokenPersonalService_1.default.validateRefreshToken(refreshToken) || null;
            if (!personalData) {
                throw new Error('Невалидный refresh token');
            }
            const tokenDbPers = yield tokenPersonalService_1.default.findToken(personalData.personalId);
            if (!tokenDbPers) {
                throw new Error('Refresh token не найден в базе данных');
            }
            const pers = yield this.personalModel.getById(personalData.personalId);
            if (!pers) {
                throw new Error('Работник не найден');
            }
            const personal_tokens = tokenPersonalService_1.default.generateTokens({ personalId: pers.id });
            yield tokenPersonalService_1.default.saveToken(pers.id, personal_tokens.refreshToken);
            return Object.assign(Object.assign({}, personal_tokens), { pers: new persdto_1.default(pers) });
        });
    }
    updatePersonal(id, personalData) {
        return __awaiter(this, void 0, void 0, function* () {
            let hashPassword = '';
            if (personalData.password) {
                hashPassword = yield bcrypt_1.default.hash(personalData.password, Number(process.env.BCRYPT_SALT_ROUNDS));
            }
            const newPersonalData = Object.assign(Object.assign(Object.assign({}, (personalData.persname && { name: personalData.persname })), (personalData.email && { email: personalData.email })), (personalData.password && { password: hashPassword }));
            return this.personalModel.update(id, newPersonalData);
        });
    }
}
exports.default = PersonalService;
