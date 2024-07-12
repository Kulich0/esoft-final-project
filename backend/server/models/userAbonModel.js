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
class UserAbonementModel {
    create(abonsIdData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAbons = yield (0, db_1.default)('user_abonement').insert(abonsIdData).returning('*');
                return newAbons;
            }
            catch (error) {
                console.error('Не удалось создать запись на занятие', error);
                throw error;
            }
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_abons = yield (0, db_1.default)('user_abonement').where({ user_id: userId });
                return user_abons;
            }
            catch (error) {
                console.error(`Не удалось получить абонементы пользователя с ID ${userId}`, error);
                throw error;
            }
        });
    }
}
exports.default = new UserAbonementModel();
