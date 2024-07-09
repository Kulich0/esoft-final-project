import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('classes', table => {
        table.binary('picture_classes');
    });

    await knex.schema.table('classSchedules', table => {
        table.string('classes').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('classes', table => {
        table.dropColumn('picture_classes');
    })
    await knex.schema.table('classSchedules', table => {
        table.dropColumn('classes');
    })
}

