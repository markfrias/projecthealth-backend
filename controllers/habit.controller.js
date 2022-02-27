const { connection } = require('../dbConfig');

// Create a new habit
const createHabit = (req, res) => {

    // Assign request body to variables
    const { habitName, habitDescription, goalId } = req.body;

    try {
        // Check for undefined fields
        if (!habitName) {
            res.status(400);
            res.json({ message: "Some fields are not filled" });
        } else {
            connection.query('INSERT INTO Habits(habitName, habitDescription, goalId) VALUES (?, ?, ?)', [habitName, habitDescription, goalId], (error, results, fields) => {
                if (error) {
                    res.status(500);
                    res.json({ message: "Internal server error" })
                    return;
                }

                res.json(results);


            })
        }
    } catch (error) {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }

}

// Habits autocomplete
const autocompleteHabits = (req, res) => {

    // Assign request body to variables
    const habitName = req.query.habitName;

    try {
        // Check for undefined fields
        if (!habitName) {
            res.status(400);
            res.json({ message: "Some fields are not filled" });
        } else {
            connection.query("SELECT habitName from Habits WHERE habitName LIKE ?;", ['%' + habitName + '%'], (error, results, fields) => {
                if (error) {
                    res.status(500);
                    res.json({ message: "Internal server error" })
                    console.error(error);
                    return;
                }

                res.json(results);

            })
        }
    } catch (error) {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }

}

// Return suggested habits
// Get two habits from each goal the user is subscribed to
/* Put code here */

// Return habits with query keyword
const getSearchedHabits = (req, res) => {

    // Assign request body to variables
    const habitName = req.query.habitName;

    try {
        // Check for undefined fields
        if (!habitName) {
            res.status(400);
            res.json({ message: "Some fields are not filled" });
        } else {
            connection.query("SELECT * from Habits WHERE habitName LIKE ?;", ['%' + habitName + '%'], (error, results, fields) => {
                if (error) {
                    res.status(500);
                    res.json({ message: "Internal server error" })
                    console.error(error);
                    return;
                }

                res.json(results);

            })
        }
    } catch (error) {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }

}

// Return all habits
const getAllHabits = (req, res) => {

    try {
        connection.query("SELECT * from Habits;", (error, results, fields) => {
            if (error) {
                res.status(500);
                res.json({ message: "Internal server error" })
                console.error(error);
                return;
            }

            res.json(results);

        })
    } catch (error) {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }

    /* Add pagination soon */
}


// Save habits for a specific user
const saveHabit = (req, res) => {

    // Assign request body to variables
    const userId = req.body.userId;
    const { habits } = req.body;


    // Turn array into nested array in preparation for SQL query
    const habitArray = habits.map((data) => {
        return [data, userId];
    });
    try {
        connection.query('INSERT INTO UserHabit(habitId, userId) VALUES ?', [habitArray], (error, results, fields) => {
            if (error) {
                if (error.code !== "ER_DUP_ENTRY") {
                    res.status(500);
                    res.json({ message: "Internal server error" })
                    console.log(error.code)
                    return;
                } else if (error.code === "ER_DUP_ENTRY") {
                    res.status(400);
                    return res.json({ message: "Duplicate entry prohibited", error: "ERR_DUP_ENTRY" });
                }

            }

            res.json(results);
        });
    } catch {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }




    // 

    /*try {
        // Check for undefined fields
        if (!habitName) {
            res.status(400);
            res.json({ message: "Some fields are not filled" });
        } else {
            connection.query('INSERT INTO Habits(habitName, habitDescription, goalId) VALUES (?, ?, ?)', [habitName, habitDescription, goalId], (error, results, fields) => {
                if (error) {
                    res.status(500);
                    res.json({ message: "Internal server error" })
                    return;
                }

                res.json(results);


            })
        }
    } catch (error) {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }
*/
}


module.exports = {
    createHabit, autocompleteHabits, getSearchedHabits, getAllHabits, saveHabit
}