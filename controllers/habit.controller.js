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
            connection.query("SELECT habitName, habitId, goalId from Habits WHERE habitName LIKE ?;", ['%' + habitName + '%'], (error, results, fields) => {
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
        return [data.habitId, userId];
    });
    try {
        connection.query('DELETE FROM UserHabit WHERE userId=?; INSERT IGNORE INTO UserHabit(habitId, userId) VALUES ?', [userId, habitArray], (error, results, fields) => {
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
}

// Fetch user specific habits
const getUserHabits = (req, res) => {

    // Assign request body to variables
    const userId = req.body.userId;

    try {
        connection.query('SELECT * FROM UserHabit NATURAL JOIN Habits where UserHabit.userId=?;', [userId], (error, results, fields) => {
            if (error) {

                res.status(500);
                res.json({ message: "Internal server error" })
                console.log(error.code)

            }
            res.json(results);
        });
    } catch {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }
}

// Fetch user specific habits
const addJournalEntries = (req, res) => {
    try {
        connection.query('SELECT * FROM Users', (err, results, fields) => {
            if (err) {
                // Add error handling
            }


            results.forEach((user) => {
                console.log(user.userId)
                //console.log(user.userId)
                user.userId


                connection.query('SELECT UserHabit.habitId, Habits.habitName, Habits.goalId, Goals.goalName FROM UserHabit JOIN Habits ON Habits.habitId=UserHabit.habitId JOIN Goals ON Goals.goalId=Habits.goalId WHERE userId=?;', [user.userId], (error, results, fields) => {
                    if (error) {
                        // Add error handling !!!
                        console.log(error);
                    }

                    const listToSend = [];
                    results.forEach((habit) => {
                        let isSame = false;
                        const generateItems = () => {
                            const itemToInsert = results[Math.floor(Math.random() * (results.length - 0) + 0)];
                            listToSend.forEach((item) => {
                                if (itemToInsert.habitId === item.habitId) {
                                    return isSame = true;
                                }

                            });
                            if (isSame) {
                                isSame = false;
                                generateItems();
                            } else {
                                listToSend.push(itemToInsert);
                            }

                        }

                        generateItems();
                    });

                    console.log(listToSend)

                    const habitsArray = listToSend.map((habit) => {
                        return [user.userId, habit.habitId, new Date()];
                    })

                    if (habitsArray.length === 0) {
                        return;
                    }
                    connection.query('INSERT INTO HabitJournal(userId, habitId, habitEntryDate) VALUES ?', [habitsArray], (error, results, fields) => {
                        if (error) {
                            console.log(error);
                            // Add error handling !!!
                        }
                        //console.log(userId)
                        console.log(results)

                    })
                })
            });
        })


    } catch {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }
}

const getJournalEntriesOnMonth = (req, res) => {

    // Assign values to variables
    const { userId } = req.body;
    const { month, year } = req.query;

    // Get sum of all nutrients and calories during the day from a specific user
    try {
        connection.query("SELECT HabitJournal.habitId, HabitJournal.userId, Habits.habitName, HabitJournal.habitAccomplished, HabitJournal.habitEntryDate, Habits.goalId, Goals.goalName  FROM HabitJournal JOIN Habits ON Habits.habitId=HabitJournal.habitId JOIN Goals ON Goals.goalId=Habits.goalId WHERE HabitJournal.userId=? AND HabitJournal.habitEntryDate like ?;", [userId, `${year}-${month}-__`], (error, results, fields) => {
            if (error) {
                // Error handling
                console.log(error)
                return
            }
            res.json(results)

        })

    } catch (error) {
        // Handle error
        // Change this later
        res.status(500);
        res.json({ message: "Internal server error" })
    }
}



module.exports = {
    createHabit, autocompleteHabits, getSearchedHabits, getAllHabits, saveHabit, getUserHabits, addJournalEntries, getJournalEntriesOnMonth
}