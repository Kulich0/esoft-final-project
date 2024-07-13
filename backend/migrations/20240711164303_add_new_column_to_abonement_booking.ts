import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  
  await knex.schema.table('user_abonement', table => {
    table.string('abonement_title'); 
    table.integer('abonement_sessions'); 
  });

  
  await knex.raw(`
    UPDATE user_abonement ua
    SET abonement_title = a.title,
        abonement_sessions = COALESCE(a.sessions_4, 0) + COALESCE(a.sessions_8, 0) + COALESCE(a.sessions_12, 0)
    FROM abonement a
    WHERE ua.abonement_id = a.id
  `);

  
  await knex.schema.table('user_abonement', table => {
    table.string('abonement_title').notNullable().alter();
    table.integer('abonement_sessions').notNullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  
  await knex.schema.table('user_abonement', table => {
    table.dropColumn('abonement_title');
    table.dropColumn('abonement_sessions');
  });

}