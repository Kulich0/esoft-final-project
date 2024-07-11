import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('classSchedules', table => {
    table.dropColumn('start_time');
    table.dropColumn('end_time');
  });

  await knex.schema.alterTable('classSchedules', table => {
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('classSchedules', table => {
    table.dropColumn('start_time');
    table.dropColumn('end_time');
  });

  await knex.schema.alterTable('classSchedules', table => {
    table.timestamp('start_time').notNullable();
    table.timestamp('end_time').notNullable();
  });
}
