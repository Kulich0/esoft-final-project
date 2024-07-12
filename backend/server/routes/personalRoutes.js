"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const roleMiddleware_1 = __importDefault(require("../middleware/roleMiddleware"));
const personalRoutes = (personalController) => {
    const router = express_1.default.Router();
    router.post('/personal-registration', [
        (0, express_validator_1.body)('persname', 'Поле с именем не может быть пустым').notEmpty(),
        (0, express_validator_1.body)('email', 'Электронная почта неверная').isEmail(),
        (0, express_validator_1.body)('password', 'Пароль должен быть больше 8 символов').isLength({ min: 8 })
    ], (req, res, next) => personalController.PersonalRegistration(req, res, next));
    router.post('/personal-login', (req, res, next) => personalController.PersonalLogin(req, res, next));
    router.post('/personal-logout', authMiddleware_1.default, (req, res, next) => personalController.PersonalLogin(req, res, next));
    router.get('/personal-refresh', (req, res, next) => personalController.PersonalRefresh(req, res, next));
    router.get('/personal', authMiddleware_1.default, (req, res, next) => personalController.getAllPersonal(req, res, next));
    router.get('/personal/:id', authMiddleware_1.default, (req, res, next) => personalController.getPersonalById(req, res, next));
    router.put('/personal/:id', authMiddleware_1.default, (req, res, next) => personalController.updatePersonal(req, res, next));
    router.post('/creating-role', [
        (0, express_validator_1.body)('persname', 'Поле с именем не может быть пустым').notEmpty(),
        (0, express_validator_1.body)('email', 'Электронная почта неверная').isEmail(),
        (0, express_validator_1.body)('password', 'Пароль должен быть больше 8 символов').isLength({ min: 8 }),
    ], (0, roleMiddleware_1.default)(['admin']), personalController.createRole);
    return router;
};
exports.default = personalRoutes;
