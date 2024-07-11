import { Router } from 'express';
import AbonementController from './../controllers/abonementController';
import { Request, Response, NextFunction } from 'express';

const abonementRoutes = (abonementController: AbonementController) => {
    const router = Router();

    router.get('/abonements', (req: Request, res: Response, next: NextFunction) => abonementController.getAllAbonements(req, res, next)); 

    return router;
};

export default abonementRoutes;
