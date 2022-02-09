const dotenv = require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    /* Use environment variables here before pushing to remote repo */
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = {
    connection: connection
}