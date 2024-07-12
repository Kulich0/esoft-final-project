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
class TokenPersonalModel {
    create(personalId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('refresh_personal_tokens');
                const personal_token = yield query
                    .insert({ personal_id: personalId, personal_token: refreshToken }, ['personal_token']);
                return personal_token;
            }
            catch (error) {
                console.error('Error creating token:', error);
                throw error;
            }
        });
    }
    findById(personalId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('refresh_personal_tokens');
                const personal_token = yield query.where({ personal_id: personalId }).first();
                return personal_token || false;
            }
            catch (error) {
                console.error('Error finding token by personal ID:', error);
                throw error;
            }
        });
    }
    update(tokenPersonalData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('refresh_personal_tokens');
                const personal_token = yield query
                    .where({ id: tokenPersonalData.id })
                    .update({ token: tokenPersonalData.refreshToken }, ['personal_token']);
                return personal_token;
            }
            catch (error) {
                console.error('Error updating token:', error);
                throw error;
            }
        });
    }
    delete(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('refresh_personal_tokens');
                const personal_token = yield query.where('personal_token', refreshToken).delete();
                return personal_token;
            }
            catch (error) {
                console.error('Error deleting token:', error);
                throw error;
            }
        });
    }
}
exports.default = new TokenPersonalModel();
