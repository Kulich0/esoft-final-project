import pool from '../db';

class ClassScheduleModel {

    async getAll(offset: number, limit: number) {
        try {
            const classSchedules = await pool('classSchedules')
                .select('*')
                .limit(limit)
                .offset(offset);
            return classSchedules;
        } catch (error) {
            console.error('Не удалось получить расписание занятий', error);
            throw error;
        }
    }

    async getById(classScheduleId: number) {
        try {
            const classSchedule = await pool('classSchedules').where({ id: classScheduleId }).first();
            return classSchedule;
        } catch (error) {
            console.error(`Не удалось получить расписание занятия с ID ${classScheduleId}`, error);
            throw error;
        }
    }

    async update(classScheduleId: number, classScheduleData: any) {
        try {
            const updatedClassSchedule = await pool('classSchedules').where({ id: classScheduleId }).update(classScheduleData, ['id', 'class_id', 'start_time', 'end_time']);
            return updatedClassSchedule;
        } catch (error) {
            console.error(`Не удалось обновить расписание занятия с ID ${classScheduleId}`, error);
            throw error;
        }
    }

    async create(classScheduleData: any) {
        try {
            const newClassSchedule = await pool('classSchedules').insert(classScheduleData).returning('*');
            return newClassSchedule;
        } catch (error) {
            console.error('Не удалось создать расписание занятия', error);
            throw error;
        }
    }

    async delete(classScheduleId: number) {
        try {
            const deletedClassSchedule = await pool('classSchedules').where({ id: classScheduleId }).del();
            return deletedClassSchedule;
        } catch (error) {
            console.error(`Не удалось удалить расписание занятия с ID ${classScheduleId}`, error);
            throw error;
        }
    }
}

export default new ClassScheduleModel();
