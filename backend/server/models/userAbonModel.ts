import pool from '../db';

class UserAbonementModel {

    async create(abonsIdData: any) {
        try {
            const newAbons = await pool('user_abonement').insert(abonsIdData).returning('*');
            return newAbons;
        } catch (error) {
            console.error('Не удалось создать запись на занятие', error);
            throw error;
        }
    }
    async getById(userId: number) {
        try {
            const user_abon = await pool('user_abonement').where({ user_id: userId }).first();
            return user_abon;
        } catch (error) {
            console.error(`Не удалось получить абонемент пользователя с ID ${userId}`, error);
            throw error;
        }
    }
    
}

export default new UserAbonementModel();
