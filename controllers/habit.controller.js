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

// Return habits with query keyword



module.exports = {
    createHabit, autocompleteHabits
}