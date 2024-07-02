import { Router } from 'express';
import ClassScheduleController from '../controllers/classSchedulesController';

const classScheduleRoutes = (classScheduleController: ClassScheduleController) => {
    const router = Router();

    router.get('/class-schedule', classScheduleController.getAllClassSchedule); 
    router.get('/class-schedule/:id', classScheduleController.getClassScheduleById); 
    router.put('/class-schedule/:id', classScheduleController.updateClassSchedule); 
    router.delete('/class-schedule/:id', classScheduleController.deleteClassSchedule); 
    router.post('/class-schedule', classScheduleController.createClassSchedule); 

    return router;
};

export default classScheduleRoutes;
