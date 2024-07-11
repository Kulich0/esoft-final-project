import { Router } from 'express';
import UserAbonementController from './../controllers/userAbonementController';
import { Request, Response, NextFunction } from 'express';

const userAbonementRoutes = (userAbonementController: UserAbonementController) => {
    const router = Router();

    router.post('/usabonements', (req: Request, res: Response, next: NextFunction) => userAbonementController.createUserAbonement(req, res, next))
    router.get('/usabonements/users/:userId', (req: Request, res: Response, next: NextFunction) => {
        console.log('/usabonements/users/:userId', req.params);
        userAbonementController.getUserAbonementsById(req, res, next);
    });
    return router;
};

export default userAbonementRoutes;
