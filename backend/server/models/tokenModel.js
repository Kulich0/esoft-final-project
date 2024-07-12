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
class TokenModel {
    create(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('refresh_tokens');
                const token = yield query
                    .insert({ user_id: userId, token: refreshToken }, ['token']);
                return token;
            }
            catch (error) {
                console.error('Error creating token:', error);
                throw error;
            }
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('refresh_tokens');
                const token = yield query.where({ user_id: userId }).first();
                return token || false;
            }
            catch (error) {
                console.error('Error finding token by user ID:', error);
                throw error;
            }
        });
    }
    update(tokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('refresh_tokens');
                const token = yield query
                    .where({ id: tokenData.id })
                    .update({ token: tokenData.refreshToken }, ['token']);
                return token;
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
                const query = (0, db_1.default)('refresh_tokens');
                const token = yield query.where('token', refreshToken).delete();
                return token;
            }
            catch (error) {
                console.error('Error deleting token:', error);
                throw error;
            }
        });
    }
}
exports.default = new TokenModel();
