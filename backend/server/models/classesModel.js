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
class ClassesModel {
    getAll(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classes = yield (0, db_1.default)('classes')
                    .select('*')
                    .limit(limit)
                    .offset(offset);
                return classes;
            }
            catch (error) {
                console.error('Не удалось получить занятие', error);
                throw error;
            }
        });
    }
    getById(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classcenter = yield (0, db_1.default)('classes').where({ id: classId }).first();
                return classcenter;
            }
            catch (error) {
                console.error(`Не удалось получить занятие с ID ${classId}`, error);
                throw error;
            }
        });
    }
    update(classId, classData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedClass = yield (0, db_1.default)('classes').where({ id: classId }).update(classData, ['id', 'title', 'description', 'duration', 'max_participants']);
                return updatedClass;
            }
            catch (error) {
                console.error(`Не удалось обновить занятие с ID ${classId}`, error);
                throw error;
            }
        });
    }
    create(classData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newClass = yield (0, db_1.default)('classes').insert(classData).returning('*');
                return newClass;
            }
            catch (error) {
                console.error('Не удалось создать занятие', error);
                throw error;
            }
        });
    }
    delete(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedClass = yield (0, db_1.default)('classes').where({ id: classId }).del();
                return deletedClass;
            }
            catch (error) {
                console.error(`Не удалось удалить занятие с ID ${classId}`, error);
                throw error;
            }
        });
    }
}
exports.default = new ClassesModel();
