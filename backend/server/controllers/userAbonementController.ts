import { Request, Response, NextFunction } from 'express';
import UserAbonementService from "../services/userAbonementService";

interface IUserAbon {
    id: number;
    user_id: number;
    abonement_id: number;
    abonement_title: string;
    abonement_sessions: number;
  }

class UserAbonementController {
    private userAbonementService: UserAbonementService;

    constructor(userAbonementService: UserAbonementService) {
        this.userAbonementService = userAbonementService;
    }

    async createUserAbonement(req: Request, res: Response, next: NextFunction) {
        try {
            const newAbonsData = req.body;
            const createdAbons = await this.userAbonementService.createUserAbonement(newAbonsData);
            res.status(201).json({ message: 'Запись на занятие создано', createdAbons });
        } catch (e) {
            next(e);
        }
    }

    async getUserAbonementsById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId, 10);
            if (isNaN(userId)) {
                res.status(400).json({ message: 'Invalid user ID' });
                return;
            }
            const userAbonements: IUserAbon[] = [];
            res.json(userAbonements);
        } catch (error) {
            next(error);
        }
    }
}

export default UserAbonementController;