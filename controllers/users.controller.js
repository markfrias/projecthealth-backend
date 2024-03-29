const { connection } = require('../dbConfig');
const { authenticate } = require('../auth/authentication');
const bcrypt = require('bcrypt');
const { addJournalEntries, addJournalEntry } = require('./missions.controller');
const { addCalendarEntry, addCalendarEntrySingle } = require('./food.controller');
const moment = require('moment');

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

// Get users from DB and send to functions within the server
const getUsersLocal = (req, res) => {

    connection.query('SELECT * FROM Users', (err, results, fields) => {
        if (err) {
            // Add error handling
        }

        let usersObject = results.map((mysqlObject, index) => {
            return Object.assign({}, mysqlObject);
        });

        sample = usersObject;

        // Check if output is correct
        //console.log(usersObject);
        console.log("hello")

        return results;


    })
};

// Creates a new user
const registerUser = async (req, res) => {
    let userId;
    try {

        // Declare a passcode variable
        let password;

        // Assign request body fields to variables
        const { username, firstName, lastName, sex, emailAddress, passcode, activityLevel, calorieBudget, dateOfBirth, weight, height, targetWeight, goals } = req.body;
        // Check required fields
        if (!firstName || !lastName || !sex || !emailAddress || !passcode || !activityLevel || !calorieBudget || !dateOfBirth || !weight || !height || !targetWeight) {
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
                    // Assign userId
                    userId = results.insertId;
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

                        addJournalEntry(userId)
                        addCalendarEntrySingle(userId);

                    });

                    // Check if there's an unfilled field
                    if (!weight || !height || !targetWeight) {
                        res.status(400);
                        res.json({ message: "Bad request" });
                    } else {
                        try {
                            connection.query("insert into WeightHeightJournal(userId, weightJournalDate, weight, height, targetWeight) values (?, ?, ?, ?, ?) on duplicate key update weight=?, height=?, targetWeight=?", [results.insertId, moment().tz('Asia/Manila').format('YYYY-MM-DD'), weight, height, targetWeight, weight, height, targetWeight], (err, results, fields) => {
                                if (err) {
                                    res.status(500);
                                    return res.json({ message: "Error" })
                                }

                                res.json(results);

                            })
                        } catch (error) {
                            res.status(500);
                            res.json({ message: "Internal server error" });
                        }
                    }
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

// Get users from DB and send to client
const getCalorieBudget = (req, res) => {

    try {
        connection.query('SELECT calorieBudget FROM Users WHERE userId=?', [req.body.userId], (err, results, fields) => {
            if (err) {
                res.status(500);
                res.json({ message: "Error" })
            }


            // Check if output is correct
            //console.log(usersObject);

            res.json(results);

        })
    } catch (error) {
        res.status(500);
        res.json({ message: "Internal server error" });
    }

};

// Update weight and height for the logged in user
const updateWeightAndHeight = (req, res) => {
    console.log(req.body)
    const { weight, height, targetWeight, userId } = req.body;

    // Check if there's an unfilled field
    if (!weight || !height || !targetWeight) {
        res.status(400);
        res.json({ message: "Bad request" });
    } else {
        try {
            connection.query("insert into WeightHeightJournal(userId, weightJournalDate, weight, height, targetWeight) values (?, ?, ?, ?, ?) on duplicate key update weight=?, height=?, targetWeight=?", [userId, moment().tz('Asia/Manila').format('YYYY-MM-DD'), weight, height, targetWeight, weight, height, targetWeight], (err, results, fields) => {
                if (err) {
                    res.status(500);
                    return res.json({ message: "Error" })
                }

                res.json(results);

            })
        } catch (error) {
            res.status(500);
            res.json({ message: "Internal server error" });
        }
    }

};

// Update weight with weight yesterday
const updateWeightFromYesterday = (req, res) => {


    try {
        connection.query('SELECT * FROM Users', (err, results, fields) => {
            if (err) {
                // Add error handling
            }


            results.forEach((user) => {
                console.log(user.userId)
                //console.log(user.userId)
                user.userId







                try {
                    connection.query(`insert into WeightHeightJournal (userId, weightJournalDate, weight, height, targetWeight) 
                        select userId, ?, weight, height, targetWeight
                        from WeightHeightJournal
                        where weightJournalDate = ? and userId=?`, [moment().tz('Asia/Manila').format('YYYY-MM-DD'), moment().subtract(1, 'days').tz('Asia/Manila').format('YYYY-MM-DD'), user.userId], (err, results, fields) => {
                        if (err) {
                            return console.log(err)
                        }

                        console.log(results)

                    })
                } catch (error) {
                    console.log(error)

                }


            });
        })


    } catch {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }


};

// Update weight and height for the logged in user
const deleteAccount = (req, res) => {
    const userId = req.body.userId;
    try {
        connection.query('DELETE FROM Users WHERE userId=?', [userId], (err, results, fields) => {
            if (err) {
                console.log(err)
                res.status(500);
                return res.json({ message: "Error" })
            }

            res.json({ message: "Account deleted" });

        })
    } catch (error) {
        res.status(500);
        res.json({ message: "Internal server error" });
        console.log(error)
    }
};

// Update progress points
const updateProgress = (req, res) => {
    const userId = req.body.userId;
    console.log(req.body)
    try {
        connection.query('UPDATE Users SET progressPoints=?, levelId=? WHERE userId=?', [req.body.progressPoints, req.body.levelId, userId], (err, results, fields) => {
            if (err) {
                console.log(err)
                res.status(500);
                return res.json({ message: "Error" })
            }
            console.log(results)
            res.json({ message: "Updated successfully" });

        })
    } catch (error) {
        res.status(500);
        res.json({ message: "Internal server error" });
        console.log(error)
    }
};

const getProgressReport = (req, res) => {
    const userId = req.body.userId;
    try {
        connection.query(`SELECT sd.height as height, sd.weight as currentWeight, sd.targetWeight, Users.levelId, Levels.levelBoundary, UserGoals.goalId, Users.progressPoints, max(WeightHeightJournal.weight) as maxWeight, min(WeightHeightJournal.weight) as minWeight, (gainOrLoss.numeratorWeight - gainOrLoss.denominatorWeight) as weightLoss FROM
        (select * from WeightHeightJournal where userId=? order by weightJournalDate desc limit 1 ) sd
        JOIN Users ON sd.userId = Users.userId
        JOIN Levels ON Users.levelId = Levels.levelId
        JOIN UserGoals ON sd.userId = UserGoals.userId
        JOIN WeightHeightJournal on sd.userId = WeightHeightJournal.userId
        JOIN (
            select userId, max(weight) as denominatorWeight, min(weight) as numeratorWeight
            from WeightHeightJournal
            where userId=? AND weightJournalDate > ? AND weightJournalDate < ?
        ) gainOrLoss ON sd.userId = gainOrLoss.userId
        WHERE (goalId=4 OR goalId=5 OR goalId=6);
        
        SELECT weightJournalDate, weight from WeightHeightJournal
        where weightJournalDate > ? AND weightJournalDate < ?
        and userId=?;
        
        
        
        SELECT sum(caloriesPerUnit * servingQty) as calories, foodJournalDate from FoodJournal
        where userId=?
        group by foodJournalDate;
        
        select (weight / power((height / 100), 2)) as bmi from WeightHeightJournal where userId=?
        and weightJournalDate > ? AND weightJournalDate < ?`, [userId, userId, moment().subtract(8, 'days').tz('Asia/Manila').format('YYYY-MM-DD'), moment().add(1, 'days').tz('Asia/Manila').format('YYYY-MM-DD')
            , moment().subtract(8, 'days').tz('Asia/Manila').format('YYYY-MM-DD'), moment().add(1, 'days').tz('Asia/Manila').format('YYYY-MM-DD'), userId, userId, userId,
            moment().subtract(8, 'days').tz('Asia/Manila').format('YYYY-MM-DD'), moment().add(1, 'days').tz('Asia/Manila').format('YYYY-MM-DD')

        ], (err, results, fields) => {
            if (err) {
                console.log(err)
                res.status(500);
                return res.json({ message: "Error" })
            }
            res.json(results);

        })
    } catch (error) {
        res.status(500);
        res.json({ message: "Internal server error" });
        console.log(error)
    }
}

const loginUser = (req, res) => {
    // Authenticate user
    authenticate(req.body, res)

}

module.exports = {
    getUsers, registerUser, loginUser, getCalorieBudget, updateWeightAndHeight, getUsersLocal, deleteAccount, getProgressReport, updateWeightFromYesterday, updateProgress
}