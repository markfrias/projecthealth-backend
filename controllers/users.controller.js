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
        const { username, firstName, lastName, sex, emailAddress, passcode, activityLevel, calorieBudget, dateOfBirth, weight, height, goals } = req.body;
        // Check required fields
        if (!firstName || !lastName || !sex || !emailAddress || !passcode || !activityLevel || !calorieBudget || !dateOfBirth || !weight || !height) {
            res.status(400);
            return res.json({ message: "Error", error: "Missing field" });
        }



        // Check if email address is already used in an existing account
        connection.query("SELECT * FROM Users WHERE emailAddress=?; ", [req.body.emailAddress], (error, results, fields) => {
            if (error) {
                res.status(500);
                console.error(error)
                return res.json({ message: "Server error" })
            }

            // Return an error message when user is not found
            if (results.length > 0) {
                res.status(409);
                res.json({ message: "Email address is already linked to an existing account", type: "Error" })
                return;
            }

            // Hash password
            bcrypt.hash(passcode, 10, function (err, hash) {

                // Error handling
                if (err) {
                    console.error(err)
                    res.status(500);
                    return res.json({ message: "Error" })
                }

                // Store hashed password in DB
                password = hash;

                // Perform INSERT query to database
                connection.query('INSERT INTO Users (username, firstname, lastname, sex, emailAddress, passcode, activityLevel, calorieBudget, dateOfBirth, weight, height) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [username, firstName, lastName, sex, emailAddress, password, activityLevel, calorieBudget, dateOfBirth, weight, height], (error, results, fields) => {
                    if (error) {
                        console.log(error)
                        // Assign appropriate status code here
                        res.status(500);
                        return res.json({ message: "Error" })
                    }
                    // Translate goal names to numbers
                    const translatedGoals = goals.map((goalName) => {
                        let number;
                        switch (goalName) {
                            case 'eatHealthier':
                                number = 2
                                break;
                            case 'increasePA':
                                number = 3;
                                break;
                            case 'loseWeight':
                                number = 4;
                                break;
                            case 'gainWeight':
                                number = 5;
                                break;
                            case 'maintainWeight':
                                number = 6;
                                break;
                            case 'improveSleep':
                                number = 7;
                                break;
                            case 'reduceAC':
                                number = 8;
                                break
                            default:
                                number = 2;
                                break;
                        }
                        return [number, results.insertId];
                    })

                    connection.query('INSERT INTO UserGoals (goalId, userId) VALUES ?', [translatedGoals], (error, results, fields) => {
                        if (error) {
                            console.log(error)
                            // Assign appropriate status code here
                            res.status(500);
                            return res.json({ message: "Error" })
                        }

                        res.json(results);
                    })
                })
            });


        })
        /*
        if () {
            res.status(409);
            res.json({ message: "Email address is already linked to an existing account", type: "Error" })
            return;
        }*/

        /*
        // Check if email address is already used in an existing account
            connection.query("SELECT * FROM Users WHERE emailAddress=?;", [req.body.emailAddress], (error, results, fields) => {
                if (error) {
                    res.status(500);
                    return res.json({ message: "Server error" })
                }
 
                // Return an error message when user is not found
                if (results.length > 0) {
                    res.status(409);
                    res.json({ message: "Email address is already linked to an existing account", type: "Error" })
                    return;
                }
            })
            */






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