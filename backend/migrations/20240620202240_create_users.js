"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable('roles', table => {
            table.increments('id').primary();
            table.string('name', 50).notNullable();
        });
        yield knex.schema.createTable('users', table => {
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
        yield knex.schema.createTable('personal', table => {
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
        yield knex.schema.createTable('classes', table => {
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
        yield knex.schema.createTable('classSchedules', table => {
            table.increments('id').primary();
            table.integer('class_id').notNullable();
            table.time('start_time').notNullable();
            table.timestamp('end_time').notNullable();
            table.foreign('class_id').references('id').inTable('classes').onDelete('CASCADE').onUpdate('CASCADE');
        });
        yield knex.schema.createTable('classBookings', table => {
            table.increments('id').primary();
            table.integer('user_id').notNullable();
            table.integer('class_schedule_id').notNullable();
            table.timestamp('booking_time').defaultTo(knex.fn.now());
            table.string('status', 20).notNullable().defaultTo('pending');
            table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('class_schedule_id').references('id').inTable('classSchedules').onDelete('CASCADE').onUpdate('CASCADE');
        });
        yield knex.schema.createTable('reviews', table => {
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
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTableIfExists('reviews');
        yield knex.schema.dropTableIfExists('classBookings');
        yield knex.schema.dropTableIfExists('classSchedules');
        yield knex.schema.dropTableIfExists('classes');
        yield knex.schema.dropTableIfExists('personal');
        yield knex.schema.dropTableIfExists('users');
        yield knex.schema.dropTableIfExists('roles');
    });
}
exports.down = down;
