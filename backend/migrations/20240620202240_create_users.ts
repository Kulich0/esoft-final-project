import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('roles', table => {
        table.increments('id').primary();
        table.string('name', 50).notNullable();
    });

    await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name', 50).unique().notNullable();
        table.string('email', 100).unique().notNullable();
        table.string('password', 255).notNullable();
        table.string('first_name', 50);
        table.string('last_name', 50);
        table.string('phone_number', 15).unique();
        table.binary('profile_picture');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('personal', table => {
        table.increments('id').primary();
        table.string('persname', 50).unique().notNullable();
        table.string('email', 100).unique().notNullable();
        table.string('password', 255).notNullable();
        table.text('bio');
        table.integer('role_id').notNullable();
        table.binary('profile_picture');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('role_id').references('id').inTable('roles').onDelete('CASCADE').onUpdate('CASCADE');
    });

    await knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.integer('instructor_id').notNullable();
        table.string('title', 100).notNullable();
        table.text('description');
        table.integer('duration');
        table.integer('max_participants');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('instructor_id').references('id').inTable('personal').onDelete('CASCADE').onUpdate('CASCADE');
    });

    await knex.schema.createTable('classSchedules', table => {
        table.increments('id').primary();
        table.integer('class_id').notNullable();
        table.timestamp('start_time').notNullable();
        table.timestamp('end_time').notNullable();
        table.foreign('class_id').references('id').inTable('classes').onDelete('CASCADE').onUpdate('CASCADE');
    });

    await knex.schema.createTable('classBookings', table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('class_schedule_id').notNullable();
        table.timestamp('booking_time').defaultTo(knex.fn.now());
        table.string('status', 20).notNullable().defaultTo('pending');
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('class_schedule_id').references('id').inTable('classSchedules').onDelete('CASCADE').onUpdate('CASCADE');
    });

    await knex.schema.createTable('reviews', table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('class_id').notNullable();
        table.integer('rating').notNullable().checkBetween([1, 5]);
        table.text('comment');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign('class_id').references('id').inTable('classes').onDelete('CASCADE').onUpdate('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('reviews');
    await knex.schema.dropTableIfExists('classBookings');
    await knex.schema.dropTableIfExists('classSchedules');
    await knex.schema.dropTableIfExists('classes');
    await knex.schema.dropTableIfExists('personal');
    await knex.schema.dropTableIfExists('users');
    await knex.schema.dropTableIfExists('roles');
}

