import ClassBookingsModel from '../models/classBookingsModel';

class ClassBookingsService {
    constructor(private classBookingsModel: typeof ClassBookingsModel) {}

    async getAllClassBookings(offset: number, limit: number) {
        return this.classBookingsModel.getAll(offset, limit);
    }

    async getClassBookingsById(classBookingsId: number) {
        return this.classBookingsModel.getById(classBookingsId);
    }

    async updateClassBooking(id: number, classBookingData: { user_id?: number; class_schedule_id?: number; booking_time?: Date; status?: string }) {
        try {
            const updatedClassBooking = await this.classBookingsModel.update(id, classBookingData);
            return updatedClassBooking;
        } catch (error) {
            console.error(`Не удалось обновить запись на занятия с ID ${id}`, error);
            throw error;
        }
    }

    async deleteClassBookings(classBookingsId: number) {
        return this.classBookingsModel.delete(classBookingsId);
    }

    async createClassBookings(classBookingData: any) {
        return this.classBookingsModel.create(classBookingData);
    }
}

export default ClassBookingsService;
