// Authorization middleware

const dotenv = require('dotenv').config();
const { connection } = require('../dbConfig');
const jwt = require('jsonwebtoken');

// Use authorization middleware with routes that need to be protected

// !!! Change some error handling messages to more appropriate ones
// Don't flag errors with unauthorized status codes or messages
const authorize = function (req, res, next) {

    // Extract JWT from Bearer token
    try {
        if (req.headers.authorization.slice(0, 6) !== "Bearer") {
            req.user = null;
            return res.status(401).send("Unauthorized");

        }
    } catch (err) {
        console.log(err)
        req.user = null;
        return res.status(500).send("Server error");
    }


    let jwtoken = req.headers.authorization.slice(7);

    jwt.verify(jwtoken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                res.status(401);
                return res.json({ message: "Unauthorized" })
            }

            return res.status(500).send("Server error");

        }

        // Search DB if user exists
        connection.query("SELECT * FROM Users WHERE emailAddress=?;", [decoded.email], (error, results, fields) => {
            if (error) {
                console.log(error)
                res.status(500);
                return res.json({ message: "Server error" });
            }
            if (results.length === 0 || results.length > 1) {
                res.status(401);
                return res.json({ message: "Unauthorized" });
            }
            req.body.email = results[0].emailAddress;
            req.body.userId = results[0].userId;

            next();
        });
    });
}

module.exports = {
    authorize
}

