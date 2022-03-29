const { connection } = require('../dbConfig');
const moment = require('moment')

// Create a new food journal entry
const createFoodEntry = (req, res) => {
    const { mealType, diaryType, foodId, foodName, servingDescription, servingUnit, servingQty, caloriesPerUnit, caloriesPer100g, carbs, protein, fat, sodium, weightInG, photosUrl } = req.body;
    const userId = req.body.userId;
    const year = moment().tz('Asia/Manila').format('YYYY');
    const month = moment().tz('Asia/Manila').format('MM');
    const day = moment().tz('Asia/Manila').format('DD');

    // Create food entry for quick note food diary entry
    try {
        if (diaryType === "quick") {

            // Check for undefined fields
            if (!userId || !mealType || !foodName || !servingDescription) {
                res.status(400);
                res.json({ message: "Some fields are not filled" });
            } else {

                // Save quick note to food journal
                connection.query('INSERT INTO FoodJournal(userId, foodJournalDate, mealType, diaryType, foodName, servingDescription, photosUrl) VALUES (?, ?, ?, ?, ?, ?, ?); UPDATE FoodCalendar SET journalLogged=1 WHERE journalDate=? AND userId=?;', [userId, moment().tz("Asia/Manila").format('YYYY-MM-DD'), mealType, diaryType, foodName, servingDescription, photosUrl, `${year}-${month}-${day}`, userId], (error, results, fields) => {
                    if (error) {
                        console.log(error)
                        res.json({ message: "An error ffs" })
                    }

                    res.json(results);
                });
            }
        } else if (diaryType === "detailed") {
            // Check for undefined fields
            if (!userId || !mealType || !foodId || !foodName || !servingUnit || !servingQty || caloriesPerUnit === "undefined" || caloriesPerUnit === "" || carbs === "undefined" || carbs === "" || protein === "undefined" || protein === "" || fat === "undefined" || fat === "" || sodium === "undefined" || sodium === "") {
                console.log(userId, mealType, foodId, foodName, servingUnit, servingQty, caloriesPerUnit, "carbs:", carbs, protein, fat, sodium)
                res.status(400);
                res.json({ message: "Some fields are not filled" });
            } else {
                // Save detailed log to food journal
                connection.query('INSERT INTO FoodJournal(userId, foodJournalDate, mealType, diaryType, foodId, foodName, servingUnit, servingQty, caloriesPerUnit, caloriesPer100g, carbs, protein, fat, sodium, weightInG) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); UPDATE FoodCalendar SET journalLogged=1 WHERE journalDate=? AND userId=?;', [userId, moment().tz('Asia/Manila').format('YYYY-MM-DD'), mealType, diaryType, foodId, foodName, servingUnit, servingQty, caloriesPerUnit, caloriesPer100g, carbs, protein, fat, sodium, weightInG, `${year}-${month}-${day}`, userId], (error, results, fields) => {
                    if (error) {
                        //console.log(error)
                        res.status(500);
                        res.json({ message: "Server error" })
                    }

                    res.json(results);
                });
            }
        } else {
            res.status(400)
            res.json({ message: "Error" })
            return
        }




    } catch (error) {
        console.log("Probably a TypeError");
        res.status(500);
        res.json({ message: "Data input erroneous" })
    }
}

const getJournalEntries = (req, res) => {

    // Assign values to variables
    const { userId } = req.body;

    // Get sum of all nutrients and calories during the day from a specific user
    try {
        connection.query("SELECT SUM(carbs) AS sumCarbs, SUM(protein) AS sumProtein, SUM(fat) AS sumFat, SUM(sodium) AS sumSodium, SUM(caloriesPerUnit * servingQty) AS sumCalories, Users.calorieBudget FROM FoodJournal INNER JOIN Users ON Users.userId=FoodJournal.userId WHERE FoodJournal.userId=? AND foodJournalDate=? ", [userId, moment().format('YYYY-MM-DD')], (error, results, fields) => {
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

const getJournalEntriesOnMonth = (req, res) => {

    // Assign values to variables
    const { userId } = req.body;
    const { month, year } = req.query;

    // Get sum of all nutrients and calories during the day from a specific user
    try {
        connection.query("SELECT * FROM FoodJournal WHERE userId=? AND foodJournalDate like ?;", [userId, `${year}-${month}-__`], (error, results, fields) => {
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

// Returns food logs from a specific day and the calorie budget for that specific user
const getJournalEntriesOnDay = (req, res) => {

    // Assign values to variables
    const { userId } = req.body;
    const { month, year, day } = req.query;

    // Get sum of all nutrients and calories during the day from a specific user
    try {
        connection.query("SELECT * FROM FoodJournal WHERE userId=? AND foodJournalDate like ?; SELECT calorieBudget FROM Users WHERE userid=?", [userId, `${year}-${month}-${day}`, userId], (error, results, fields) => {
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


// Create new calendar entry per user
const addCalendarEntry = (req, res) => {
    try {
        connection.query('SELECT * FROM Users', (err, results, fields) => {
            if (err) {
                // Add error handling
            }


            results.forEach((user) => {
                console.log(user.userId)
                //console.log(user.userId)
                user.userId


                connection.query('INSERT INTO FoodCalendar(userId, journalDate, journalLogged) VALUES (?, ?, ?)', [user.userId, moment().tz('Asia/Manila').format('YYYY-MM-DD'), 0], (error, results, fields) => {
                    if (error) {
                        console.log(error);
                        // Add error handling !!!
                    }
                    //console.log(userId)
                    console.log(results)

                })

            });
        })


    } catch {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }
}

// Create new calendar entry per user
const addCalendarEntrySingle = (userId) => {
    try {




        connection.query('INSERT INTO FoodCalendar(userId, journalDate, journalLogged) VALUES (?, ?, ?)', [userId, moment().tz('Asia/Manila').format('YYYY-MM-DD'), 0], (error, results, fields) => {
            if (error) {
                console.log(error);
                console.log("yeet")
                // Add error handling !!!
            }
            //console.log(userId)
            console.log(results)

        })





    } catch {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }
}

// Returns streaks for habits
const getFoodJournalStreaks = (req, res) => {

    // Assign values to variables
    const { userId } = req.body;

    // Get streaks
    try {
        connection.query(`with streakgroup as (
            SELECT RANK() OVER (ORDER by journalDate) AS streakrowno,
            journalDate, 
            DATE_ADD( journalDate, INTERVAL -RANK() OVER (ORDER BY journalDate) DAY) AS dateadd
            from FoodCalendar
            where userId=? and journalLogged=1
                order by journalDate
        )
        
        SELECT COUNT(*) AS days_streak,
        MIN(journalDate) AS min_date,
        MAX(journalDate) AS max_date
        from streakgroup
        group by dateadd
        `, [userId], (error, results, fields) => {
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

// Returns streaks for habits
const updateStreaks = (req, res) => {

    // Assign values to variables
    const { userId, year, month, day } = req.body;

    // Get streaks
    try {
        connection.query(`UPDATE FoodCalendar SET journalLogged=1 WHERE journalDate=? AND userId=?
        `, [`${year}-${month}-${day}`, userId], (error, results, fields) => {
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
    createFoodEntry, getJournalEntries, getJournalEntriesOnMonth, getJournalEntriesOnDay, addCalendarEntry, getFoodJournalStreaks, updateStreaks, addCalendarEntrySingle
}