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
class ClassScheduleService {
    constructor(classScheduleModel) {
        this.classScheduleModel = classScheduleModel;
    }
    getAllClassSchedule(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classScheduleModel.getAll(offset, limit);
        });
    }
    getClassScheduleById(classScheduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classScheduleModel.getById(classScheduleId);
        });
    }
    updateClassSchedule(id, classScheduleData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClassScheduleData = Object.assign(Object.assign({}, (classScheduleData.start_time && { start_time: classScheduleData.start_time })), (classScheduleData.end_time && { description: classScheduleData.end_time }));
            return this.classScheduleModel.update(id, newClassScheduleData);
        });
    }
    deleteClassSchedule(classScheduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classScheduleModel.delete(classScheduleId);
        });
    }
    createClassSchedule(classScheduleData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classScheduleModel.create(classScheduleData);
        });
    }
}
exports.default = ClassScheduleService;
