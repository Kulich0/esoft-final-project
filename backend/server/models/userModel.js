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
const db_1 = __importDefault(require("../db"));
class UserModel {
    getAll(offest, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, db_1.default)('users').
                    select('*')
                    .limit(limit)
                    .offset(offest);
                return users;
            }
            catch (error) {
                console.error('Не удалось получить пользователей', error);
                throw error;
            }
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('users');
                const user = yield query.where({ id: userId }).first();
                return user;
            }
            catch (error) {
                console.error(`Не удалось получить пользователя с ID ${userId}`, error);
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('users');
                const user = yield query.where({ email }).first();
                return user;
            }
            catch (error) {
                console.error(`Не удалось получить пользователя с email ${email}`, error);
                throw error;
            }
        });
    }
    update(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('users');
                const user = yield query.where({ id: userId }).update({
                    name: userData.name,
                    email: userData.email,
                    password: userData.password
                }, ['id', 'name', 'email']);
                return user;
            }
            catch (error) {
                console.error(`Не удалось обновить пользователя с ID ${userId}`, error);
                throw error;
            }
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('users');
                const user = yield query.insert(userData).returning('*');
                return user;
            }
            catch (error) {
                console.error('Не удалось создать пользователя', error);
                throw error;
            }
        });
    }
}
;
exports.default = new UserModel();
