const { connection } = require('../dbConfig');

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
            if (!userId || !mealType || !foodId || !foodName || !servingUnit || !servingQty || !caloriesPerUnit || !caloriesPer100g || !carbs || !protein || !fat || !sodium || !weightInG) {
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
        }




    } catch (error) {
        console.log("Probably a TypeError");
        res.status(500);
        res.json({ message: "Data input erroneous" })
    }
}


module.exports = {
    createFoodEntry
}