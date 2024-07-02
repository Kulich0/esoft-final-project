import pool from '../db';

class TokenModel {

    async create(userId: number, refreshToken: string ): Promise<any> {
        try {
            const query = pool('refresh_tokens');
            const token = await query
            .insert({user_id: userId, token: refreshToken}, ['token']);
            return token;
        } catch(error) {
            console.error('Error creating token:', error);
            throw error;
        }
    }

    async findById(userId: number) {
        try {
            const query = pool('refresh_tokens');
            const token = await query.where({user_id: userId}).first();
            return token || false
        } catch(error) {
            console.error('Error finding token by user ID:', error);
            throw error;
        }
    }

    async update(tokenData: {id: number, refreshToken: string}): Promise<any> {
        try {
            const query = pool('refresh_tokens');
            const token = await query
            .where({id: tokenData.id})
            .update({token: tokenData.refreshToken}, ['token']);
            return token;
        } catch(error) {
            console.error('Error updating token:', error);
            throw error;
        }
    }

    async delete(refreshToken: string): Promise<number> {
        try {
            const query = pool('refresh_tokens');
            const token = await query.where('token', refreshToken).delete();
            return token;
        } catch(error) {
            console.error('Error deleting token:', error);
            throw error;
        }
    }
}

export default new TokenModel();