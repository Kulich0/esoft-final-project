import { Request, Response, NextFunction } from 'express';
import PersonalService from '../services/personalService';
import { validationResult } from 'express-validator';

class PersonalController {
    private personalService: PersonalService;

    constructor(personalService: PersonalService) {
        this.personalService = personalService;
    }

    async PersonalRegistration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const personal_tokens = await this.personalService.PersonalRegistration(req.body);
            res.cookie('refreshToken', personal_tokens.refreshToken, { 
                maxAge: 30 * 24 * 60 * 60 * 1000, 
                httpOnly: true 
            });
            res.status(201).json(personal_tokens);
        } catch (e) {
            next(e);
        }
    }

    async PersonalLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const personal_tokens = await this.personalService.PersonalLogin(req.body);
            res.cookie('refreshToken', personal_tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(personal_tokens);
        } catch (e) {
            next(e);
        }
    }

    async PersonalLogout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            await this.personalService.PersonalLogout(refreshToken);
            res.clearCookie('refreshToken');
            res.status(200).json('Успешный выход');
        } catch (e) {
            next(e);
        }
    }

    async PersonalRefresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.status(401).json('Токен обновления отсутствует');
            }
            const personal_tokens = await this.personalService.refresh(refreshToken);
            res.cookie('refreshToken', personal_tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(personal_tokens);
        } catch (e) {
            next(e);
        }
    }

    async getAllPersonal(req: Request, res: Response, next: NextFunction) {
        try {
            const { offset, limit } = req.body;
            const pers = await this.personalService.getAllPersonal(offset, limit);
            res.status(200).json(pers);
        } catch (e) {
            next(e);
        }
    }

    async getPersonalById(req: Request, res: Response, next: NextFunction) {
        try {
            const personalId = parseInt(req.params.id, 10);
            if (isNaN(personalId)) {
                return res.status(400).json('Неверный ID пользователя');
            }
            const pers = await this.personalService.getPersonalById(personalId);
            if (!pers) {
                res.status(404).json('Пользователь не найден');
            } else {
                res.status(200).json(pers);
            }
        } catch (e) {
            next(e);
        }
    }

    async updatePersonal(req: Request, res: Response, next: NextFunction) {
        try {
            const personalId = parseInt(req.params.id, 10);
            if (isNaN(personalId)) {
                return res.status(400).json('Неверный ID пользователя');
            }
            const updatedPersonalData = req.body;
            const pers = await this.personalService.updatePersonal(personalId, updatedPersonalData);
            
            if (pers) {
                res.status(200).json({'Работник обновлен': updatedPersonalData});
            } else {
                res.status(404).json('Пользователь не найден');
            }
        } catch (e) {
            next(e);
        }
    }

    async createRole(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newPersonal = await this.personalService.createRole(req.body);
            res.status(200).json({'Успешная регистрация': newPersonal});
        } catch(e) {
            next(e);
        }
    }
}

export default PersonalController;
