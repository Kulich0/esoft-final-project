import pool from '../db';

class RolesModel {
    async findById(roleId: number) {
        try {
            const query = pool('roles');
            const role = await query.where({id: roleId}).first();
            return role;
        } catch(error) {
            console.error('', error);
            throw error;
        }
    }
};

export default new RolesModel();