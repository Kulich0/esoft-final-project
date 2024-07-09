import { Router } from 'express';
import ClassesController from './../controllers/classesController';
import { Request, Response, NextFunction } from 'express';

const classesRoutes = (classController: ClassesController) => {
    const router = Router();

    router.get('/classes', (req: Request, res: Response, next: NextFunction) => classController.getAllClasses(req, res, next)); 
    router.get('/classes/:id', (req: Request, res: Response, next: NextFunction) => classController.getClassesById(req, res, next)); 
    router.put('/classes/:id', (req: Request, res: Response, next: NextFunction) => classController.updateClasses(req, res, next)); 
    router.delete('/classes/:id', (req: Request, res: Response, next: NextFunction) => classController.deleteClasses(req, res, next)); 
    router.post('/classes', (req: Request, res: Response, next: NextFunction) => classController.createClasses(req, res, next)); 

    return router;
};

export default classesRoutes;
