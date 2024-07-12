"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
require('dotenv').config();
const db = (0, knex_1.default)({
    client: 'pg',
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
    },
    pool: {
        min: Number(process.env.DB_MIN),
        max: Number(process.env.DB_MAX),
        idleTimeoutMillis: Number(process.env.DB_TIMEOUTMILLIS),
    }
});
exports.default = db;
