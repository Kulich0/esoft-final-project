import { Knex } from "knex";

exports.seed = async function(knex: Knex) {
    await knex('classSchedules').del();

    await knex('classSchedules').insert([
        {
            id: 1,
            class_id: 3,
            classes: 'Йога в гамаках для начинающих',
            start_time: '07:30:00',
            end_time: '08:45:00',
            day: 'Понедельник'
        },
        {
            id: 2,
            class_id: 4,
            classes: 'Йога в гамаках для начинающих и продолжающих',
            start_time: '07:00:00',
            end_time: '08:20:00',
            day: 'Вторник'
        },
        {
            id: 3,
            class_id: 4,
            classes: 'Йога в гамаках для начинающих и продолжающих',
            start_time: '08:25:00',
            end_time: '09:30:00',
            day: 'Вторник'
        },
        {
            id: 4,
            class_id: 4,
            classes: 'Группа здоровья',
            start_time: '14:20:00',
            end_time: '15:20:00',
            day: 'Вторник'
        },
        {
            id: 5,
            class_id: 4,
            classes: 'Йога в гамаках для начинающих и продолжающих',
            start_time: '15:30:00',
            end_time: '16:40:00',
            day: 'Вторник'
        },
        {
            id: 6,
            class_id: 3,
            classes: 'Йога в гамаках для начинающих',
            start_time: '07:30:00',
            end_time: '08:45:00',
            day: 'Среда'
        },
        {
            id: 7,
            class_id: 2,
            classes: 'Хатха-йога',
            start_time: '07:00:00',
            end_time: '08:20:00',
            day: 'Четверг'
        },
        {
            id: 8,
            class_id: 2,
            classes: 'Хатха-йога',
            start_time: '08:25:00',
            end_time: '09:30:00',
            day: 'Четверг'
        },
        {
            id: 9,
            class_id: 4,
            classes: 'Группа здоровья',
            start_time: '14:20:00',
            end_time: '15:20:00',
            day: 'Четверг'
        },
        {
            id: 10,
            class_id: 2,
            classes: 'Хатха-йога',
            start_time: '15:30:00',
            end_time: '16:40:00',
            day: 'Четверг'
        },
        {
            id: 11,
            class_id: 3,
            classes: 'Йога в гамаках для начинающих',
            start_time: '07:30:00',
            end_time: '08:45:00',
            day: 'Пятница'
        },
        {
            id: 12,
            class_id: 2,
            classes: 'Хатха-йога',
            start_time: '07:15:00',
            end_time: '08:45:00',
            day: 'Суббота'
        }
    ]);
};
