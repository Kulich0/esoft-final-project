import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/userController';
import authenticateJWT from '../middleware/authMiddleware';

const userRoutes = (userController: UserController) => {
    const router = express.Router();

    router.post('/registration', [
        body('name', 'Поле с именем не может быть пустым').notEmpty(),
        body('email', 'Электронная почта неверная').isEmail(),
        body('password', 'Пароль должен быть больше 8 символов').isLength({ min: 8 })
    ], (req: Request, res: Response, next: NextFunction) => userController.registration(req, res, next)); 

    router.post('/login', (req: Request, res: Response, next: NextFunction) => userController.login(req, res, next));
    router.post('/logout', authenticateJWT, (req: Request, res: Response, next: NextFunction) => userController.logout(req, res, next));
    router.get('/refresh', (req: Request, res: Response, next: NextFunction) => userController.refresh(req, res, next));
    router.get('/users', authenticateJWT, (req: Request, res: Response, next: NextFunction) => userController.getAllUsers(req, res, next));
    router.get('/users/:id', (req: Request, res: Response, next: NextFunction) => userController.getUserById(req, res, next));
    router.put('/users/:id', authenticateJWT, (req: Request, res: Response, next: NextFunction) => userController.updateUser(req, res, next));

    return router;
};

export default userRoutes;
