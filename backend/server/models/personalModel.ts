import pool from '../db';

interface PersonalData {
    persname: string;
    email: string;
    password: string;
}

class PersonalModel {

    async getAll(offest: number, limit: number) {
        try {
            const personal = await pool('personal').
            select('*')
            .limit(limit)
            .offset(offest);
            return personal;

        } catch(error) {
            console.error('Не удалось получить персонал', error);
            throw error;
        }
    }

    async getById(personalId: number) {
        try {
            const query = pool('personal');
            const pers = await query.where({id: personalId}).first();
            return pers;

        } catch(error) {
            console.error(`Не удалось получить работника с ID ${personalId}`, error);
            throw error;
            
        }
    }

    async findByEmail(email: string) {
        try {
            const query = pool('personal');
            const pers = await query.where({email}).first();
            return pers;

        } catch(error) {
            console.error(`Не удалось получить работника с email ${email}`, error);
            throw error;
            
        }
    }

    async update(personalId: number, personalData: any) {
        try {
            const query = pool('personal');
            const pers = await query.where({id: personalId}).update({
                persname: personalData.persname,
                email: personalData.email,
                password: personalData.password
            }, ['id', 'persname', 'email']);
            return pers;

        } catch(error) {
            console.error(`Не удалось обновить работника с ID ${personalId}`, error);
            throw error;
            
        }
    }

    async create(personalData: PersonalData) {
        try {
            const query = pool('personal');
            await query.insert(personalData);

        } catch(error) {
            console.error('Не удалось создать работника', error);
            throw error;

        }
    }
    async createRole(personalData: PersonalData) {
        try {
            const query = pool('personal');
            await query.insert(personalData);
        } catch(error) {
            console.error('Не удалось создать работника', error);
            throw error;

        }
    }
    
};

export default new PersonalModel();
