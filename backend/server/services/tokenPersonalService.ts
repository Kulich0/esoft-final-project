require('dotenv').config();
import jwt, { Secret } from 'jsonwebtoken';
import TokenPersonalModel from '../models/tokenPersonalModel';

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT secrets must be defined');
}

const JWT_ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET;
const ACCESS_DURATION = process.env.ACCESS_DURATION;
const REFRESH_DURATION = process.env.REFRESH_DURATION;

class TokenPersonalService {
    generateTokens(payload: object): { accessToken: string, refreshToken: string } {
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_DURATION });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_DURATION });
        
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(personalId: number, refreshToken: string) {
        const tokenPersonalData = await TokenPersonalModel.findById(personalId);
        if (tokenPersonalData) {
            tokenPersonalData.refreshToken = refreshToken;
            return TokenPersonalModel.update(tokenPersonalData);
        }
        const personal_token  = await TokenPersonalModel.create(personalId, refreshToken);
        return personal_token;
    }

    async removeToken(refreshToken: string) {
        await TokenPersonalModel.delete(refreshToken);
    }

    validateAccessToken(personal_token: string) {
        try {
            const tokenPersonalData = jwt.verify(personal_token, JWT_ACCESS_SECRET);
            return tokenPersonalData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(personal_token: string) {
        try {
            const tokenPersonalData = jwt.verify(personal_token, JWT_REFRESH_SECRET);
            return tokenPersonalData;
        } catch (e) {
            return null;
        }
    }

    async findToken(personal_id: number) {
        const tokenPersonalData = await TokenPersonalModel.findById(personal_id);
        return tokenPersonalData;
    }
}

export default new TokenPersonalService();
