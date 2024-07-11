import pool from '../db';

class AbonementModel {

    async getAll(offset: number, limit: number) {
        try {
            const classSchedules = await pool('abonement')
                .select('*')
                .limit(limit)
                .offset(offset);
            return classSchedules;
        } catch (error) {
            console.error('Не удалось получить абонемент', error);
            throw error;
        }
    }

    
}

export default new AbonementModel();
