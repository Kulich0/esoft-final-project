"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_DATABASE || 'yogacenter'
        },
        pool: {
            min: process.env.DB_MIN ? parseInt(process.env.DB_MIN) : 2,
            max: process.env.DB_MAX ? parseInt(process.env.DB_MAX) : 50,
            idleTimeoutMillis: process.env.DB_TIMEOUTMILLIS ? parseInt(process.env.DB_TIMEOUTMILLIS) : 20000,
        },
        migrations: {
            directory: './migrations',
            tableName: 'migrations'
        }
    }
};
module.exports = config;
