import { Knex } from "knex";

exports.seed = async function(knex: Knex) {
    await knex('abonement').del();

    await knex('abonement').insert([
        {
            id: 1,
            title: 'Йога в гамаках для начинающих',
            sessions_4: 1800,
            sessions_8: 3200,
            sessions_12: 3600
        },
        {
            id: 2,
            title: 'Йога в гамаках средний уровень',
            sessions_4: 1800,
            sessions_8: 3200,
            sessions_12: 3600
        },
        {
            id: 3,
            title: 'Хатха йога',
            sessions_4: 1800,
            sessions_8: 3200,
            sessions_12: 3600
        },
        {
            id: 4,
            title: 'Йога нидра',
            sessions_4: 1800,
            sessions_8: 3200,
            sessions_12: 3600
        },
        {
            id: 5,
            title: 'Индивидуальные тренинг',
            sessions_4: 1200,
            sessions_8: null,
            sessions_12: null
        },
        {
            id: 6,
            title: 'Группа здоровья',
            sessions_4: 1800,
            sessions_8: 3200,
            sessions_12: 3600
        }
    ]);
};
