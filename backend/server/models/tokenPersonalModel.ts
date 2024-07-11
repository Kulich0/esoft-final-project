import pool from '../db';

class TokenPersonalModel {

    async create(personalId: number, refreshToken: string ): Promise<any> {
        try {
            const query = pool('refresh_personal_tokens');
            const personal_token = await query
            .insert({personal_id: personalId, personal_token: refreshToken}, ['personal_token']);
            return personal_token;
        } catch(error) {
            console.error('Error creating token:', error);
            throw error;
        }
    }

    async findById(personalId: number) {
        try {
            const query = pool('refresh_personal_tokens');
            const personal_token = await query.where({personal_id: personalId}).first();
            return personal_token || false
        } catch(error) {
            console.error('Error finding token by personal ID:', error);
            throw error;
        }
    }

    async update(tokenPersonalData: {id: number, refreshToken: string}): Promise<any> {
        try {
            const query = pool('refresh_personal_tokens');
            const personal_token = await query
            .where({id: tokenPersonalData.id})
            .update({token: tokenPersonalData.refreshToken}, ['personal_token']);
            return personal_token;
        } catch(error) {
            console.error('Error updating token:', error);
            throw error;
        }
    }

    async delete(refreshToken: string): Promise<number> {
        try {
            const query = pool('refresh_personal_tokens');
            const personal_token = await query.where('personal_token', refreshToken).delete();
            return personal_token;
        } catch(error) {
            console.error('Error deleting token:', error);
            throw error;
        }
    }
}

export default new TokenPersonalModel();