require('dotenv').config();
import jwt, { Secret } from 'jsonwebtoken';
import TokenModel from '../models/tokenModel';

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT secrets must be defined');
}

const JWT_ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET;
const ACCESS_DURATION = process.env.ACCESS_DURATION;
const REFRESH_DURATION = process.env.REFRESH_DURATION;

class TokenService {
    generateTokens(payload: object): { accessToken: string, refreshToken: string } {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_DURATION });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_DURATION });
        
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await TokenModel.findById(userId);
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return TokenModel.update(tokenData);
        }
        const token = await TokenModel.create(userId, refreshToken);
        return token;
    }

    async removeToken(refreshToken: string) {
        await TokenModel.delete(refreshToken);
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findToken(user_id: number) {
        const tokenData = await TokenModel.findById(user_id);
        return tokenData;
    }
}

export default new TokenService();
