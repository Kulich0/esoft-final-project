import { Knex } from "knex";

exports.seed = async function(knex: Knex) {
    await knex('personal').del();

    await knex('personal').insert([
        {
            id: 2,
            persname: 'StepaAdmin',
            email: 'stepan.09myromec@gmail.com',
            password: '$2b$10$Ttmx1V.2dpBcaGU5e6AE3u78mNCnS8UIVN9ae1ZfTrnhtweVdmjEC',
            bio: 'System Administrator',
            role_id: 1,
            created_at: '2024-07-05 00:24:16.554507+05',
            updated_at: '2024-07-05 00:24:16.554507+05'
        },
        {
            id: 3,
            persname: 'Instructor-N',
            email: 'nadv@gmail.com',
            password: '$2b$10$PSIb9kx8beoZRuhsD68X/eEkshRkaOgT45qDok4fyvhfGlNh93Sgq',
            bio: null,
            role_id: 2,
            created_at: '2024-07-05 00:29:50.464296+05',
            updated_at: '2024-07-05 00:29:50.464296+05'
        }
    ]);
};
