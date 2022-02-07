const dotenv = require('dotenv').config();
const express = require('express');
const mysql = require('mysql');

const app = express();

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

const connection = mysql.createConnection({
    /* Use environment variables here before pushing to remote repo */
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Establish connection with database
connection.connect((err) => {
    if (err) {
        console.log(err);
    }

    console.log("Successfully connected to database");
});

// Sample database query
/*
connection.query('SELECT * FROM Users', (err, results, fields) => {
    if (err) {
        console.log(err);
    }

    console.log(results);
})
*/




