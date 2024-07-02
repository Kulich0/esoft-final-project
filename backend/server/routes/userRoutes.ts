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
    ], userController.registration); 

    router.post('/login', userController.login);
    router.post('/logout', authenticateJWT, userController.logout);
    router.get('/refresh', userController.refresh);
    router.get('/users', authenticateJWT, userController.getAllUsers);
    router.get('/users/:id', authenticateJWT, userController.getUserById);
    router.put('/users/:id', authenticateJWT, userController.updateUser);

    return router;
};

export default userRoutes;
