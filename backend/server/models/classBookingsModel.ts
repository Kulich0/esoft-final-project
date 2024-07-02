import pool from '../db';

class ClassBookingsModel {

    async getAll(offset: number, limit: number) {
        try {
            const classBookings = await pool('classBookings')
                .select('*')
                .limit(limit)
                .offset(offset);
            return classBookings;
        } catch (error) {
            console.error('Не удалось получить записи на занятие', error);
            throw error;
        }
    }

    async getById(classBookingsId: number) {
        try {
            const classBooking = await pool('classBookings').where({ id: classBookingsId }).first();
            return classBooking;
        } catch (error) {
            console.error(`Не удалось получить запись на занятие с ID ${classBookingsId}`, error);
            throw error;
        }
    }

    async update(classBookingId: number, classBookingData: any) {
        try {
            const updatedClassBooking = await pool('classBookings')
                .where({ id: classBookingId })
                .update(classBookingData, ['id', 'user_id', 'class_schedule_id', 'booking_time', 'status']);
            return updatedClassBooking;
        } catch (error) {
            console.error(`Не удалось обновить запись бронирования занятия с ID ${classBookingId}`, error);
            throw error;
        }
    }

    async create(classBookingsIdData: any) {
        try {
            const newClassBookings = await pool('classBookings').insert(classBookingsIdData).returning('*');
            return newClassBookings;
        } catch (error) {
            console.error('Не удалось создать запись на занятие', error);
            throw error;
        }
    }

    async delete(classBookingsId: number) {
        try {
            const deletedClassBookings = await pool('classBookings').where({ id: classBookingsId }).del();
            return deletedClassBookings;
        } catch (error) {
            console.error(`Не удалось удалить запись на занятие с ID ${classBookingsId}`, error);
            throw error;
        }
    }
}

export default new ClassBookingsModel();