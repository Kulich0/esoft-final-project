import { Knex } from "knex";



exports.seed = async function(knex: Knex) {
    await knex('roles').del();

    await knex('roles').insert([
        {
            id: 1,
            name: 'admin'
        },
        {
            id: 2,
            name: 'instructor'
        }
    ]);
};
