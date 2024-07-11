import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('classSchedules', table => {
        table.string('day', 20);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('classSchedules', table => {
        table.dropColumn('day');
    })
}

