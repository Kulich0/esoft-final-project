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
class ClassBookingsController {
    constructor(classBookingsServices) {
        this.classBookingsServices = classBookingsServices;
    }
    getAllClassBookings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classBookings = yield this.classBookingsServices.getAllClassBookings(req.query.offset, req.query.limit);
                res.status(200).json(classBookings);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getClassBookingsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                if (isNaN(userId)) {
                    return res.status(400).json({ message: 'Неверный ID пользователя' });
                }
                const classBookings = yield this.classBookingsServices.getClassBookingsById(userId);
                if (!classBookings || classBookings.length === 0) {
                    res.status(404).json({ message: 'Записи на занятия не найдены' });
                }
                else {
                    res.status(200).json(classBookings);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateClassBookings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classBookingId = parseInt(req.params.id, 10);
                if (isNaN(classBookingId)) {
                    return res.status(400).json({ message: 'Неверный ID записи на занятие' });
                }
                const updatedClassBookingData = req.body;
                const updatedClassBooking = yield this.classBookingsServices.updateClassBooking(classBookingId, updatedClassBookingData);
                res.status(200).json({ message: 'Запись на занятие обновлено', updatedClassBooking });
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteClassBookings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classBookingId = parseInt(req.params.id, 10);
                if (isNaN(classBookingId)) {
                    return res.status(400).json({ message: 'Неверный ID записи на занятие' });
                }
                yield this.classBookingsServices.deleteClassBookings(classBookingId);
                res.status(200).json({ message: 'Запись на занятие удалено' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    createClassBookings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newClassBookingData = req.body;
                const createdClassBooking = yield this.classBookingsServices.createClassBookings(newClassBookingData);
                res.status(201).json({ message: 'Запись на занятие создано', createdClassBooking });
            }
            catch (e) {
                next(e);
            }
        });
    }
    getClassesBookingsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                if (isNaN(userId)) {
                    return res.status(400).json({ message: 'Неверный ID пользователя' });
                }
                const classBookings = yield this.classBookingsServices.getClassesBookingsById(userId);
                if (!classBookings || classBookings.length === 0) {
                    res.status(404).json({ message: 'Записи на занятия не найдены' });
                }
                else {
                    res.status(200).json(classBookings);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = ClassBookingsController;
