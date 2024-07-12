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
class ClassScheduleController {
    constructor(classScheduleService) {
        this.classScheduleService = classScheduleService;
    }
    getAllClassSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classSchedules = yield this.classScheduleService.getAllClassSchedule(req.query.offset, req.query.limit);
                res.status(200).json(classSchedules);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getClassScheduleById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classScheduleId = parseInt(req.params.id, 10);
                if (isNaN(classScheduleId)) {
                    return res.status(400).json({ message: 'Неверный ID расписания занятия' });
                }
                const classSchedule = yield this.classScheduleService.getClassScheduleById(classScheduleId);
                if (!classSchedule) {
                    res.status(404).json({ message: 'Занятие не найдено' });
                }
                else {
                    res.status(200).json(classSchedule);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateClassSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classScheduleId = parseInt(req.params.id, 10);
                if (isNaN(classScheduleId)) {
                    return res.status(400).json({ message: 'Неверный ID расписания занятия' });
                }
                const updatedClassScheduleData = req.body;
                const updatedClassSchedule = yield this.classScheduleService.updateClassSchedule(classScheduleId, updatedClassScheduleData);
                res.status(200).json({ message: 'Расписание занятия обновлено', updatedClassSchedule });
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteClassSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classScheduleId = parseInt(req.params.id, 10);
                if (isNaN(classScheduleId)) {
                    return res.status(400).json({ message: 'Неверный ID расписания занятия' });
                }
                yield this.classScheduleService.deleteClassSchedule(classScheduleId);
                res.status(200).json({ message: 'Расписание занятия удалено' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    createClassSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newClassScheduleData = req.body;
                const createdClassSchedule = yield this.classScheduleService.createClassSchedule(newClassScheduleData);
                res.status(201).json({ message: 'Занятие создано', createdClassSchedule });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = ClassScheduleController;
