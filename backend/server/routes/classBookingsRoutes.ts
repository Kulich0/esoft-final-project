import { Router } from 'express';
import ClassBookingsController from './../controllers/classBookingsController';

const classBookingsRoutes = (classBookingsController: ClassBookingsController) => {
    const router = Router();

    router.get('/class-bookings', classBookingsController.getAllClassBookings); 
    router.get('/class-bookings/:id', classBookingsController.getClassBookingsById); 
    router.put('/class-bookings/:id', classBookingsController.updateClassBookings); 
    router.delete('/class-bookings/:id', classBookingsController.deleteClassBookings); 
    router.post('/class-bookings', classBookingsController.createClassBookings); 

    return router;
};

export default classBookingsRoutes;
