const { connection } = require('../dbConfig');


// Saves reminder preference to server (create if nothing exists, update if a record exists), subscribes to preference topics, unsubscribes to replaced topics via registration token
const subscribeToReminders = async (req, res) => {

    try {

        // Assign request body values to variables
        const { breakfast, lunch, dinner } = req.body;

        // Check if preferences exist
        connection.query('SELECT ');

        /*
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

*/
    } catch (error) {
        console.log(error)
        res.status(500);
        res.json({ message: "Server error" })
    }


}

module.exports = {
    subscribeToReminders
}