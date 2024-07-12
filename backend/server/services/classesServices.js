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
class ClassesService {
    constructor(classesModel) {
        this.classesModel = classesModel;
    }
    getAllClasses(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classesModel.getAll(offset, limit);
        });
    }
    getClassesById(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classesModel.getById(classId);
        });
    }
    updateClass(id, classData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClassData = Object.assign(Object.assign(Object.assign(Object.assign({}, (classData.title && { title: classData.title })), (classData.description && { description: classData.description })), (classData.duration && { duration: classData.duration })), (classData.max_participants && { max_participants: classData.max_participants }));
            return this.classesModel.update(id, newClassData);
        });
    }
    deleteClass(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classesModel.delete(classId);
        });
    }
    createClass(classData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classesModel.create(classData);
        });
    }
}
exports.default = ClassesService;
