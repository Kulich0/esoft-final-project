import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('abonement', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.integer('sessions_4').nullable(); 
    table.integer('sessions_8').nullable(); 
    table.integer('sessions_12').nullable(); 
    table.integer('individual_price').nullable(); 
    });

    await knex.schema.createTable('user_abonement', table => {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.integer('abonement_id').notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.foreign('abonement_id').references('id').inTable('abonement').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now()); 

    });
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTableIfExists('abonement');
    await knex.schema.dropTableIfExists('user_abonement');
}

