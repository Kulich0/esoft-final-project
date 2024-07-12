"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const userRoutes = (userController) => {
    const router = express_1.default.Router();
    router.post('/registration', [
        (0, express_validator_1.body)('name', 'Поле с именем не может быть пустым').notEmpty(),
        (0, express_validator_1.body)('email', 'Электронная почта неверная').isEmail(),
        (0, express_validator_1.body)('password', 'Пароль должен быть больше 8 символов').isLength({ min: 8 })
    ], (req, res, next) => userController.registration(req, res, next));
    router.post('/login', (req, res, next) => userController.login(req, res, next));
    router.post('/logout', (req, res, next) => userController.logout(req, res, next));
    router.get('/refresh', (req, res, next) => userController.refresh(req, res, next));
    router.get('/users', authMiddleware_1.default, (req, res, next) => userController.getAllUsers(req, res, next));
    router.get('/users/:id', (req, res, next) => userController.getUserById(req, res, next));
    router.put('/users/:id', (req, res, next) => userController.updateUser(req, res, next));
    return router;
};
exports.default = userRoutes;
