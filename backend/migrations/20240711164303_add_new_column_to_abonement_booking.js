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
        yield knex.schema.table('user_abonement', table => {
            table.string('abonement_title');
            table.integer('abonement_sessions');
        });
        yield knex.raw(`
    UPDATE user_abonement ua
    SET abonement_title = a.title,
        abonement_sessions = COALESCE(a.sessions_4, 0) + COALESCE(a.sessions_8, 0) + COALESCE(a.sessions_12, 0)
    FROM abonement a
    WHERE ua.abonement_id = a.id
  `);
        yield knex.schema.table('user_abonement', table => {
            table.string('abonement_title').notNullable().alter();
            table.integer('abonement_sessions').notNullable().alter();
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.table('user_abonement', table => {
            table.dropColumn('abonement_title');
            table.dropColumn('abonement_sessions');
        });
    });
}
exports.down = down;
