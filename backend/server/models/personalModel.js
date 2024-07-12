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
class PersonalModel {
    getAll(offest, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personal = yield (0, db_1.default)('personal').
                    select('*')
                    .limit(limit)
                    .offset(offest);
                return personal;
            }
            catch (error) {
                console.error('Не удалось получить персонал', error);
                throw error;
            }
        });
    }
    getById(personalId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('personal');
                const pers = yield query.where({ id: personalId }).first();
                return pers;
            }
            catch (error) {
                console.error(`Не удалось получить работника с ID ${personalId}`, error);
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('personal');
                const pers = yield query.where({ email }).first();
                return pers;
            }
            catch (error) {
                console.error(`Не удалось получить работника с email ${email}`, error);
                throw error;
            }
        });
    }
    update(personalId, personalData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('personal');
                const pers = yield query.where({ id: personalId }).update({
                    persname: personalData.persname,
                    email: personalData.email,
                    password: personalData.password
                }, ['id', 'persname', 'email']);
                return pers;
            }
            catch (error) {
                console.error(`Не удалось обновить работника с ID ${personalId}`, error);
                throw error;
            }
        });
    }
    create(personalData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('personal');
                yield query.insert(personalData);
            }
            catch (error) {
                console.error('Не удалось создать работника', error);
                throw error;
            }
        });
    }
    createRole(personalData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('personal');
                yield query.insert(personalData);
            }
            catch (error) {
                console.error('Не удалось создать работника', error);
                throw error;
            }
        });
    }
}
;
exports.default = new PersonalModel();
