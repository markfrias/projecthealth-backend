const dotenv = require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createPool({
    /* Use environment variables here before pushing to remote repo */
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    connectionLimit: 300,
    acquireTimeout: 100000,
    connectTimeout: 100000,
    queueLimit: 10000,
});

module.exports = {
    connection: connection
}