import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('refresh_personal_tokens', table => {
        table.increments('id').primary();
        table.integer('personal_id').notNullable().unsigned();
        table.foreign('personal_id').references('id').inTable('personal').onDelete('CASCADE');
        table.text('personal_token').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('refresh_personal_tokens')
}
