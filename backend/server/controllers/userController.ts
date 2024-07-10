import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';
import { validationResult } from 'express-validator';
const ApiError = require('../api-error/api-error');

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }


    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const tokens = await this.userService.registration(req.body);
            res.cookie('refreshToken', tokens.refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true 
            });
            res.status(201).json(tokens);
        } catch (e) {
            next(e);
        }
    }
    

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const tokens = await this.userService.login(req.body);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(tokens);
        } catch (e) {
            next(ApiError.internal('An error occurred during login'));;
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            await this.userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.status(200).json({ message: 'Успешный выход' });
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(401).json({ message: 'Токен обновления отсутствует' });
            }
            const tokens = await this.userService.refresh(refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(tokens);
        } catch (e) {
            next(e);
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getAllUsers(req.body.offset, req.body.limit);
            res.status(200).json(users);
        } catch (e) {
            next(e);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                return res.status(400).json({ message: 'Неверный ID пользователя' });
            }
            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({ message: 'Пользователь не найден' });
            } else {
                res.status(200).json(user);
            }
        } catch (e) {
            next(e);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.id, 10);
            if (isNaN(userId)) {
                return res.status(400).json({ message: 'Неверный ID пользователя' });
            }
            const updatedUserData = req.body;
            const user = await this.userService.updateUser(userId, updatedUserData);
            res.status(200).json({ message: 'Пользователь обновлен', user });
        } catch (e) {
            next(e);
        }
    }
}

export default UserController;
