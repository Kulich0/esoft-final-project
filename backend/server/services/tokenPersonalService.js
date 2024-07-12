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
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenPersonalModel_1 = __importDefault(require("../models/tokenPersonalModel"));
if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT secrets must be defined');
}
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_DURATION = process.env.ACCESS_DURATION;
const REFRESH_DURATION = process.env.REFRESH_DURATION;
class TokenPersonalService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_DURATION });
        const refreshToken = jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_DURATION });
        return {
            accessToken,
            refreshToken
        };
    }
    saveToken(personalId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenPersonalData = yield tokenPersonalModel_1.default.findById(personalId);
            if (tokenPersonalData) {
                tokenPersonalData.refreshToken = refreshToken;
                return tokenPersonalModel_1.default.update(tokenPersonalData);
            }
            const personal_token = yield tokenPersonalModel_1.default.create(personalId, refreshToken);
            return personal_token;
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tokenPersonalModel_1.default.delete(refreshToken);
        });
    }
    validateAccessToken(personal_token) {
        try {
            const tokenPersonalData = jsonwebtoken_1.default.verify(personal_token, JWT_ACCESS_SECRET);
            return tokenPersonalData;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(personal_token) {
        try {
            const tokenPersonalData = jsonwebtoken_1.default.verify(personal_token, JWT_REFRESH_SECRET);
            return tokenPersonalData;
        }
        catch (e) {
            return null;
        }
    }
    findToken(personal_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenPersonalData = yield tokenPersonalModel_1.default.findById(personal_id);
            return tokenPersonalData;
        });
    }
}
exports.default = new TokenPersonalService();
