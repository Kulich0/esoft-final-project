import knex from 'knex';
require('dotenv').config();

const db = knex({
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

export default db;
