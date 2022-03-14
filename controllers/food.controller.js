const { connection } = require('../dbConfig');
const moment = require('moment')

// Create a new food journal entry
const createFoodEntry = (req, res) => {
    const { mealType, diaryType, foodId, foodName, servingDescription, servingUnit, servingQty, caloriesPerUnit, caloriesPer100g, carbs, protein, fat, sodium, weightInG, photosUrl } = req.body;
    const userId = req.body.userId;
    // Create food entry for quick note food diary entry
    try {
        if (diaryType === "quick") {

            // Check for undefined fields
            if (!userId || !mealType || !foodName || !servingDescription) {
                res.status(400);
                res.json({ message: "Some fields are not filled" });
            } else {

                // Save quick note to food journal
                connection.query('INSERT INTO FoodJournal(userId, foodJournalDate, mealType, diaryType, foodName, servingDescription, photosUrl) VALUES (?, ?, ?, ?, ?, ?, ?)', [userId, new Date(), mealType, diaryType, foodName, servingDescription, photosUrl], (error, results, fields) => {
                    if (error) {
                        console.log(error)
                        res.json({ message: "An error ffs" })
                    }

                    res.json(results);
                });
            }
        } else if (diaryType === "detailed") {
            // Check for undefined fields
            if (!userId || !mealType || !foodId || !foodName || !servingUnit || !servingQty || !caloriesPerUnit || /*!caloriesPer100g ||*/ !carbs || !protein || !fat || !sodium) {
                console.log(userId, new Date(), mealType, diaryType, foodId, foodName, servingUnit, servingQty, caloriesPerUnit, caloriesPer100g, carbs, protein, fat, sodium, weightInG)
                res.status(400);
                res.json({ message: "Some fields are not filled" });
            } else {
                // Save detailed log to food journal
                connection.query('INSERT INTO FoodJournal(userId, foodJournalDate, mealType, diaryType, foodId, foodName, servingUnit, servingQty, caloriesPerUnit, caloriesPer100g, carbs, protein, fat, sodium, weightInG) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userId, new Date(), mealType, diaryType, foodId, foodName, servingUnit, servingQty, caloriesPerUnit, caloriesPer100g, carbs, protein, fat, sodium, weightInG], (error, results, fields) => {
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


module.exports = {
    createFoodEntry, getJournalEntries
}