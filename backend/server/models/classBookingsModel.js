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
class ClassBookingsModel {
    getAll(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classBookings = yield (0, db_1.default)('classBookings')
                    .select('*')
                    .limit(limit)
                    .offset(offset);
                return classBookings;
            }
            catch (error) {
                console.error('Не удалось получить записи на занятие', error);
                throw error;
            }
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classBookings = yield (0, db_1.default)('classBookings').where({ user_id: userId });
                return classBookings;
            }
            catch (error) {
                console.error(`Не удалось получить записи на занятия для пользователя с ID ${userId}`, error);
                throw error;
            }
        });
    }
    update(classBookingId, classBookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedClassBooking = yield (0, db_1.default)('classBookings')
                    .where({ id: classBookingId })
                    .update(classBookingData, ['id', 'user_id', 'class_schedule_id', 'booking_time', 'status']);
                return updatedClassBooking;
            }
            catch (error) {
                console.error(`Не удалось обновить запись бронирования занятия с ID ${classBookingId}`, error);
                throw error;
            }
        });
    }
    create(classBookingsIdData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newClassBookings = yield (0, db_1.default)('classBookings').insert(classBookingsIdData).returning('*');
                return newClassBookings;
            }
            catch (error) {
                console.error('Не удалось создать запись на занятие', error);
                throw error;
            }
        });
    }
    delete(classBookingsId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedClassBookings = yield (0, db_1.default)('classBookings').where({ id: classBookingsId }).del();
                return deletedClassBookings;
            }
            catch (error) {
                console.error(`Не удалось удалить запись на занятие с ID ${classBookingsId}`, error);
                throw error;
            }
        });
    }
    getClassBookingsById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const classBookings = yield (0, db_1.default)('classBookings')
                    .join('classSchedules', 'classBookings.class_schedule_id', 'classSchedules.id')
                    .select('classBookings.id', 'classSchedules.classes', 'classSchedules.start_time', 'classSchedules.end_time', 'classSchedules.day')
                    .where('classBookings.user_id', userId);
                return classBookings;
            }
            catch (error) {
                console.error(`Не удалось получить записи на занятия для пользователя с ID ${userId}`, error);
                throw error;
            }
        });
    }
}
exports.default = new ClassBookingsModel();
