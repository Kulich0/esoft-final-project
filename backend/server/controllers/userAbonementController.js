"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class UserAbonementController {
    constructor(userAbonementService) {
        this.userAbonementService = userAbonementService;
    }
    createUserAbonement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAbonsData = req.body;
                const createdAbons = yield this.userAbonementService.createUserAbonement(newAbonsData);
                res.status(201).json({ message: 'Запись на занятие создано', createdAbons });
            }
            catch (e) {
                next(e);
            }
        });
    }
    getUserAbonementsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                if (isNaN(userId)) {
                    res.status(400).json({ message: 'Invalid user ID' });
                    return;
                }
                const userAbonements = yield this.userAbonementService.getUserAbonementsById(userId);
                res.json(userAbonements);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserAbonementController;
