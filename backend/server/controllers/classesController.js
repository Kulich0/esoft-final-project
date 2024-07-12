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
class ClassesController {
    constructor(classesService) {
        this.classesService = classesService;
    }
    getAllClasses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classes = yield this.classesService.getAllClasses(req.query.offset, req.query.limit);
                res.status(200).json(classes);
            }
            catch (e) {
                next(e);
            }
        });
    }
    getClassesById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classId = parseInt(req.params.id, 10);
                if (isNaN(classId)) {
                    return res.status(400).json({ message: 'Неверный ID занятия' });
                }
                const classcenter = yield this.classesService.getClassesById(classId);
                if (!classcenter) {
                    res.status(404).json({ message: 'Занятие не найдено' });
                }
                else {
                    res.status(200).json(classcenter);
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    updateClasses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classId = parseInt(req.params.id, 10);
                if (isNaN(classId)) {
                    return res.status(400).json({ message: 'Неверный ID занятия' });
                }
                const updatedClassesData = req.body;
                const updatedClass = yield this.classesService.updateClass(classId, updatedClassesData);
                res.status(200).json({ message: 'Занятие обновлено', updatedClass });
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteClasses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classId = parseInt(req.params.id, 10);
                if (isNaN(classId)) {
                    return res.status(400).json({ message: 'Неверный ID занятия' });
                }
                yield this.classesService.deleteClass(classId);
                res.status(200).json({ message: 'Занятие удалено' });
            }
            catch (e) {
                next(e);
            }
        });
    }
    createClasses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newClassData = req.body;
                const createdClass = yield this.classesService.createClass(newClassData);
                res.status(201).json({ message: 'Занятие создано', createdClass });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = ClassesController;
