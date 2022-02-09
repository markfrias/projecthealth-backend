const dotenv = require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const { connection } = require('./dbConfig');
const usersRouter = require('./routes/users.route');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Sample variable  
//let sample = [];

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

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

    let usersObject = results.map((mysqlObject, index) => {
        return Object.assign({}, mysqlObject);
    });

    sample = usersObject;

    console.log(usersObject);

})
*/

// Routes
app.use('/api/users', usersRouter);




