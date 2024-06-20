import { table } from "console";
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Roles', table => {
        table.increments('id').primary();
        table.string('name', 50).notNullable();
    });

    await knex.schema.createTable('Users', table => {
        table.increments('id').primary();
        table.string('username', 50).unique().notNullable();
        table.string('email', 100).unique().notNullable();
        table.string('password', 255).notNullable();
        table.string('first_name', 50);
        table.string('last_name', 50);
        table.string('phone_number', 15).unique();
        table.integer('role_id').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('role_id').references('id').inTable('Roles').onDelete('CASCADE').onUpdate('CASCADE');
    });

    await knex.schema.createTable('Personal', table => {
        table.increments('id').primary();
        table.string('first_name', 50).notNullable();
        table.string('last_name', 50).notNullable();
        table.string('role', 50).notNullable();
        table.text('bio');
        table.string('profile_picture', 255);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('Classes', table => {
        table.increments('id').primary();
        table.integer('instructor_id').notNullable();
        table.string('title', 100).notNullable();
        table.text('description');
        table.integer('duration');
        table.integer('max_participants');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('instructor_id').references('id').inTable('Personal').onDelete('CASCADE').onUpdate('CASCADE');
    });

    await knex.schema.createTable('ClassSchedules', table => {
        table.increments('id').primary();
        table.integer('class_id').notNullable();
        table.timestamp('start_time').notNullable();
        table.timestamp('end_time').notNullable();
        table.foreign('class_id').references('id').inTable('Classes').onDelete('CASCADE').onUpdate('CASCADE');
    });

    await knex.schema.createTable('ClassBookings', table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('class_schedule_id').notNullable();
        table.timestamp('booking_time').defaultTo(knex.fn.now());
        table.string('status', 20).notNullable().defaultTo('pending');
        table.foreign('user_id').references('id').inTable('Users').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('class_schedule_id').references('id').inTable('ClassSchedules').onDelete('CASCADE').onUpdate('CASCADE');
    });

    await knex.schema.createTable('Reviews', table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('class_id').notNullable();
        table.integer('rating').notNullable().checkBetween([1, 5]);
        table.text('comment');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('user_id').references('id').inTable('Users').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('class_id').references('id').inTable('Classes').onDelete('CASCADE').onUpdate('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('Reviews');
    await knex.schema.dropTableIfExists('ClassBookings');
    await knex.schema.dropTableIfExists('ClassSchedules');
    await knex.schema.dropTableIfExists('Classes');
    await knex.schema.dropTableIfExists('Personal');
    await knex.schema.dropTableIfExists('Users');
    await knex.schema.dropTableIfExists('Roles');
}

