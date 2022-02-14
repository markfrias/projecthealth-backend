const { connection } = require('../dbConfig');
const { authenticate } = require('../auth/authentication');
const bcrypt = require('bcrypt');

// Get users from DB and send to client
const getUsers = (req, res) => {

    connection.query('SELECT * FROM Users', (err, results, fields) => {
        if (err) {
            res.status(404);
            res.json({ message: "Error" })
        }

        let usersObject = results.map((mysqlObject, index) => {
            return Object.assign({}, mysqlObject);
        });

        sample = usersObject;

        // Check if output is correct
        //console.log(usersObject);

        res.json({ payload: results, message: "Success" });

    })
};

// Creates a new user
const registerUser = async (req, res) => {

    try {

        // Declare a passcode variable
        let password;

        // Assign request body fields to variables
        const { username, firstName, lastName, sex, emailAddress, passcode, activityLevel, calorieBudget, dateOfBirth, weight, height } = req.body;

        // Check required fields
        if (!username || !firstName || !lastName || !sex || !emailAddress || !passcode || !activityLevel || !calorieBudget || !dateOfBirth || !weight || !height) {
            res.json({ message: "Error", error: "Missing field" })
        }

        // Hash password
        bcrypt.hash(passcode, 10, function (err, hash) {

            // Error handling
            if (err) {
                res.status(500);
                res.json({ message: "Error" })
            }

            // Store hashed password in DB
            password = hash;

            // Perform INSERT query to database
            connection.query('INSERT INTO Users (username, firstname, lastname, sex, emailAddress, passcode, activityLevel, calorieBudget, dateOfBirth, weight, height) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, firstName, lastName, sex, emailAddress, password, activityLevel, calorieBudget, dateOfBirth, weight, height], (error, results, fields) => {
                if (error) {
                    console.log(error)
                    // Assign appropriate status code here
                    res.send({ message: "Error" })
                }
                res.send(results);
            })
        });


    } catch (error) {
        console.log(error)
        res.status(500);
        res.json({ message: "Server error" })
    }


}

const loginUser = (req, res) => {

    // Authenticate user
    authenticate(req.body, res)

}

module.exports = {
    getUsers, registerUser, loginUser
}