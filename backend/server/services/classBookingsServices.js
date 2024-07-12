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
class ClassBookingsService {
    constructor(classBookingsModel) {
        this.classBookingsModel = classBookingsModel;
    }
    getAllClassBookings(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classBookingsModel.getAll(offset, limit);
        });
    }
    getClassBookingsById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classBookingsModel.getById(userId);
        });
    }
    updateClassBooking(id, classBookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedClassBooking = yield this.classBookingsModel.update(id, classBookingData);
                return updatedClassBooking;
            }
            catch (error) {
                console.error(`Не удалось обновить запись на занятия с ID ${id}`, error);
                throw error;
            }
        });
    }
    deleteClassBookings(classBookingsId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classBookingsModel.delete(classBookingsId);
        });
    }
    createClassBookings(classBookingData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classBookingsModel.create(classBookingData);
        });
    }
    getClassesBookingsById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.classBookingsModel.getClassBookingsById(userId);
        });
    }
}
exports.default = ClassBookingsService;
