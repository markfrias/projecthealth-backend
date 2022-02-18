const dotenv = require('dotenv').config();
const { connection } = require('../dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function authenticate(body, res, token) {

    // Check if email address is registered
    connection.query("SELECT * FROM Users WHERE emailAddress=?;", [body.emailAddress], (error, results, fields) => {
        if (error) {
            res.status(500);
            return res.json({ message: "Server error" })
        }

        // Return an error message when user is not found
        if (results.length === 0) {
            res.status(401);
            return res.json({ message: "Email or password mismatch" })
        }

        // Check if password if correct
        bcrypt.compare(body.passcode, results[0].passcode, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({ message: "Server error" })
            }

            if (result === false) {
                res.status(401);
                return res.send({ message: "Email or password mismatch" })
            }

            // Generate access token
            let token = jwt.sign({ iss: "https://projecthealthapp.herokuapp.com/", aud: "https://projecthealth-frontend.vercel.app/", email: body.emailAddress }, process.env.JWT_SECRET, { expiresIn: 900000 });
            console.log(token)
            res.json({ jwt: "Bearer " + token, status: "Success", /*emailAddress: body.emailAddress*/ });

        })
    })
}

module.exports = {
    authenticate
}
