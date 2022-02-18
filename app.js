const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const { connection } = require('./dbConfig');
const usersRouter = require('./routes/users.route');
const rateLimit = require('express-rate-limit')


const app = express();


// Middleware
app.use(cors());
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




const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use('/api', limiter)



// Routes
app.use('/api/users', usersRouter);




