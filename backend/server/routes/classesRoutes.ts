import { Router } from 'express';
import ClassesController from './../controllers/classesController';

const classesRoutes = (classController: ClassesController) => {
    const router = Router();

    router.get('/classes', classController.getAllClasses); 
    router.get('/classes/:id', classController.getClassesById); 
    router.put('/classes/:id', classController.updateClasses); 
    router.delete('/classes/:id', classController.deleteClasses); 
    router.post('/classes', classController.createClasses); 

    return router;
};

export default classesRoutes;
