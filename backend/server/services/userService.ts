import bcrypt from 'bcrypt';
import UserModel from '../models/userModel';
import TokenService from '../services/tokenService';
import UserDto from '../userdto/userdto';
import { JwtPayload } from 'jsonwebtoken'; 
require('dotenv').config();

interface CustomJwtPayload extends JwtPayload {
    userId: number;
}

class UserService {
    constructor(private userModel: typeof UserModel) {}

    async registration(userData: { name: string; email: string; password: string }) {
        const candidate = await this.userModel.findByEmail(userData.email);

        if (candidate) {
            throw new Error(`Пользователь с такой почтой ${userData.email} уже существует`);
        }

        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
        const hashPassword = await bcrypt.hash(userData.password, saltRounds);
        const newUserData = {
            name: userData.name,
            email: userData.email,
            password: hashPassword
        };

        await this.userModel.create(newUserData);
        const user = await this.userModel.findByEmail(userData.email);

        if (!user) {
            throw new Error('Ошибка при создании пользователя');
        }

        const tokens = TokenService.generateTokens({ userId: user.id });
        await TokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: new UserDto(user)
        };
    }

    async login(userData: { email: string; password: string }) {
        const user = await this.userModel.findByEmail(userData.email);

        if (user && await bcrypt.compare(userData.password, user.password)) {
            const tokens = TokenService.generateTokens({ userId: user.id });
            await TokenService.saveToken(user.id, tokens.refreshToken);

            return {
                ...tokens,
                user: new UserDto(user)
            };
        } else {
            throw new Error('Неверный пароль или email');
        }
    }

    async logout(refreshToken: string) {
        return TokenService.removeToken(refreshToken);
    }

    async getAllUsers(offset: number, limit: number) {
        return this.userModel.getAll(offset, limit);
    }

    async getUserById(userId: number) {
        return this.userModel.getById(userId);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new Error('Refresh token отсутствует');
        }

        const userData = TokenService.validateRefreshToken(refreshToken) as CustomJwtPayload || null ;

        if (!userData) {
            throw new Error('Невалидный refresh token');
        }

        const tokenDb = await TokenService.findToken(userData.userId);

        if (!tokenDb) {
            throw new Error('Refresh token не найден в базе данных');
        }

        const user = await this.userModel.getById(userData.userId);
        if (!user) {
            throw new Error('Пользователь не найден');
        }

        const tokens = TokenService.generateTokens({ userId: user.id });
        await TokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: new UserDto(user)
        };
    }

    async updateUser(id: number, userData: { name?: string; email?: string; password?: string }) {
        let hashPassword = '';
        if (userData.password) {
            hashPassword = await bcrypt.hash(userData.password, Number(process.env.BCRYPT_SALT_ROUNDS));
        }

        const newUserData = {
            ...(userData.name && { name: userData.name }),
            ...(userData.email && { email: userData.email }),
            ...(userData.password && { password: hashPassword })
        };

        return this.userModel.update(id, newUserData);
    }
}

export default UserService;