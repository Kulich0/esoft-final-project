import pool from '../db';

class ClassesModel {

    async getAll(offset: number, limit: number) {
        try {
            const classes = await pool('classes')
                .select('*')
                .limit(limit)
                .offset(offset);
            return classes;
        } catch (error) {
            console.error('Не удалось получить занятие', error);
            throw error;
        }
    }

    async getById(classId: number) {
        try {
            const classcenter = await pool('classes').where({ id: classId }).first();
            return classcenter;
        } catch (error) {
            console.error(`Не удалось получить занятие с ID ${classId}`, error);
            throw error;
        }
    }

    async update(classId: number, classData: any) {
        try {
            const updatedClass = await pool('classes').where({ id: classId }).update(classData, ['id', 'title', 'description', 'duration', 'max_participants']);
            return updatedClass;
        } catch (error) {
            console.error(`Не удалось обновить занятие с ID ${classId}`, error);
            throw error;
        }
    }

    async create(classData: any) {
        try {
            const newClass = await pool('classes').insert(classData).returning('*');
            return newClass;
        } catch (error) {
            console.error('Не удалось создать занятие', error);
            throw error;
        }
    }

    async delete(classId: number) {
        try {
            const deletedClass = await pool('classes').where({ id: classId }).del();
            return deletedClass;
        } catch (error) {
            console.error(`Не удалось удалить занятие с ID ${classId}`, error);
            throw error;
        }
    }
}

export default new ClassesModel();
