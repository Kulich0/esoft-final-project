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
        yield knex.schema.createTable('abonement', table => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.integer('sessions_4').nullable();
            table.integer('sessions_8').nullable();
            table.integer('sessions_12').nullable();
            table.integer('individual_price').nullable();
        });
        yield knex.schema.createTable('user_abonement', table => {
            table.increments('id').primary();
            table.integer('user_id').notNullable();
            table.integer('abonement_id').notNullable();
            table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
            table.foreign('abonement_id').references('id').inTable('abonement').onDelete('CASCADE').onUpdate('CASCADE');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTableIfExists('abonement');
        yield knex.schema.dropTableIfExists('user_abonement');
    });
}
exports.down = down;
