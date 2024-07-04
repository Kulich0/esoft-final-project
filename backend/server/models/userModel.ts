import pool from '../db';


class UserModel {

    async getAll(offest: number, limit: number) {
        try {
            const users = await pool('users').
            select('*')
            .limit(limit)
            .offset(offest);
            return users;

        } catch(error) {
            console.error('Не удалось получить пользователей', error);
            throw error;
            
        }
    }

    async getById(userId: number) {
        try {
            const query = pool('users');
            const user = await query.where({id: userId}).first();
            return user;

        } catch(error) {
            console.error(`Не удалось получить пользователя с ID ${userId}`, error);
            throw error;
            
        }
    }

    async findByEmail(email: string) {
        try {
            const query = pool('users');
            const user = await query.where({email}).first();
            return user;

        } catch(error) {
            console.error(`Не удалось получить пользователя с email ${email}`, error);
            throw error;
            
        }
    }

    async update(userId: number, userData: any) {
        try {
            const query = pool('users');
            const user = await query.where({id: userId}).update({
                name: userData.name,
                email: userData.email,
                password: userData.password
            }, ['id', 'name', 'email']);
            return user;

        } catch(error) {
            console.error(`Не удалось обновить пользователя с ID ${userId}`, error);
            throw error;
            
        }
    }

    async create(userData: any) {
        try {
            const query = pool('users');
            const user = await query.insert(userData).returning('*');
            return user;

        } catch(error) {
            console.error('Не удалось создать пользователя', error);
            throw error;

        }
    }
    
};

export default new UserModel();