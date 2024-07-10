import { Router } from 'express';
import ClassBookingsController from './../controllers/classBookingsController';
import { Request, Response, NextFunction } from 'express';

const classBookingsRoutes = (classBookingsController: ClassBookingsController) => {
    const router = Router();

    router.get('/class-bookings', (req: Request, res: Response, next: NextFunction) => classBookingsController.getAllClassBookings(req, res, next)); 
    router.get('/class-bookings/users/:userId', (req: Request, res: Response, next: NextFunction) => classBookingsController.getClassBookingsById(req, res, next));    
    router.put('/class-bookings/:id', (req: Request, res: Response, next: NextFunction) => classBookingsController.updateClassBookings(req, res, next)); 
    router.delete('/class-bookings/:id', (req: Request, res: Response, next: NextFunction) => classBookingsController.deleteClassBookings(req, res, next)); 
    router.post('/class-bookings', (req: Request, res: Response, next: NextFunction) => classBookingsController.createClassBookings(req, res, next)); 

    return router;
};

export default classBookingsRoutes;
