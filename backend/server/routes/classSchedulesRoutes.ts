import { Router } from 'express';
import ClassScheduleController from '../controllers/classSchedulesController';
import { Request, Response, NextFunction } from 'express';

const classScheduleRoutes = (classScheduleController: ClassScheduleController) => {
    const router = Router();

    router.get('/class-schedule', (req: Request, res: Response, next: NextFunction) => classScheduleController.getAllClassSchedule(req, res, next)); 
    router.get('/class-schedule/:id', (req: Request, res: Response, next: NextFunction) => classScheduleController.getClassScheduleById(req, res, next)); 
    router.put('/class-schedule/:id', (req: Request, res: Response, next: NextFunction) => classScheduleController.updateClassSchedule(req, res, next)); 
    router.delete('/class-schedule/:id', (req: Request, res: Response, next: NextFunction) => classScheduleController.deleteClassSchedule(req, res, next)); 
    router.post('/class-schedule', (req: Request, res: Response, next: NextFunction) => classScheduleController.createClassSchedule(req, res, next)); 

    return router;
};

export default classScheduleRoutes;
