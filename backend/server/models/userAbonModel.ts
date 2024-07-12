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
            const user_abons = await pool('user_abonement').where({ user_id: userId });
            return user_abons;
        } catch (error) {
            console.error(`Не удалось получить абонементы пользователя с ID ${userId}`, error);
            throw error;
        }
    }
    
}

export default new UserAbonementModel();
