import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import PersonalController from '../controllers/personalController';
import authenticateJWT from '../middleware/authMiddleware';
import authorizeRole from '../middleware/roleMiddleware';

const personalRoutes = (personalController: PersonalController) => {
    const router = express.Router();

    router.post('/personal-registration', [
        body('persname', 'Поле с именем не может быть пустым').notEmpty(),
        body('email', 'Электронная почта неверная').isEmail(),
        body('password', 'Пароль должен быть больше 8 символов').isLength({ min: 8 })
    ], (req: Request, res: Response, next: NextFunction) => personalController.PersonalRegistration(req, res, next)); 

    router.post('/personal-login', (req: Request, res: Response, next: NextFunction) => personalController.PersonalLogin(req, res, next));
    router.post('/personal-logout', authenticateJWT, (req: Request, res: Response, next: NextFunction) => personalController.PersonalLogin(req, res, next));
    router.get('/personal-refresh', (req: Request, res: Response, next: NextFunction) => personalController.PersonalRefresh(req, res, next));
    router.get('/personal', authenticateJWT, (req: Request, res: Response, next: NextFunction) => personalController.getAllPersonal(req, res, next));
    router.get('/personal/:id', authenticateJWT, (req: Request, res: Response, next: NextFunction) => personalController.getPersonalById(req, res, next));
    router.put('/personal/:id', authenticateJWT, (req: Request, res: Response, next: NextFunction) => personalController.updatePersonal(req, res, next));
    
    router.post('/creating-role', [
        body('persname', 'Поле с именем не может быть пустым').notEmpty(),
        body('email', 'Электронная почта неверная').isEmail(),
        body('password', 'Пароль должен быть больше 8 символов').isLength({ min: 8 }),  
    ], authorizeRole(['admin']), personalController.createRole);
    return router;
};

export default personalRoutes;
