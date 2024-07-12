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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class ClassScheduleModel {
    getAll(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classSchedules = yield (0, db_1.default)('classSchedules')
                    .select('*')
                    .limit(limit)
                    .offset(offset);
                return classSchedules;
            }
            catch (error) {
                console.error('Не удалось получить расписание занятий', error);
                throw error;
            }
        });
    }
    getById(classScheduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classSchedule = yield (0, db_1.default)('classSchedules').where({ id: classScheduleId }).first();
                return classSchedule;
            }
            catch (error) {
                console.error(`Не удалось получить расписание занятия с ID ${classScheduleId}`, error);
                throw error;
            }
        });
    }
    update(classScheduleId, classScheduleData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedClassSchedule = yield (0, db_1.default)('classSchedules').where({ id: classScheduleId }).update(classScheduleData, ['id', 'class_id', 'start_time', 'end_time']);
                return updatedClassSchedule;
            }
            catch (error) {
                console.error(`Не удалось обновить расписание занятия с ID ${classScheduleId}`, error);
                throw error;
            }
        });
    }
    create(classScheduleData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newClassSchedule = yield (0, db_1.default)('classSchedules').insert(classScheduleData).returning('*');
                return newClassSchedule;
            }
            catch (error) {
                console.error('Не удалось создать расписание занятия', error);
                throw error;
            }
        });
    }
    delete(classScheduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedClassSchedule = yield (0, db_1.default)('classSchedules').where({ id: classScheduleId }).del();
                return deletedClassSchedule;
            }
            catch (error) {
                console.error(`Не удалось удалить расписание занятия с ID ${classScheduleId}`, error);
                throw error;
            }
        });
    }
}
exports.default = new ClassScheduleModel();
