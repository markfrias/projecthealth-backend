const { connection } = require('../dbConfig');


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

                connection.query('SELECT level FROM Users WHERE userId=?', [user.userId], (error, results, fields) => {
                    if (error) {
                        // Add error handling here !!!
                        console.log(error.code)

                    }

                    if (results === undefined) {
                        return
                    }
                    const userLevel = results[0].level;
                    console.log(user.userId + " " + userLevel)



                    connection.query('SELECT Missions.missionId, Missions.missionName, Missions.missionLevel, Missions.missionSuggestion FROM Missions WHERE Missions.missionLevel <= ?;', [user.userId, userLevel], (error, results, fields) => {
                        if (error) {
                            // Add error handling !!!
                            console.log(error);
                        }


                        const listToSend = [];
                        for (let i = 0; i <= 2; i++) {
                            let isSame = false;
                            const generateItems = () => {
                                const itemToInsert = results[Math.floor(Math.random() * (results.length - 0) + 0)];
                                listToSend.forEach((item) => {
                                    if (itemToInsert.missionId === item.missionId) {
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




                        }

                        connection.query('INSERT INTO MissionsCalendar (userId, missionId, missionEntryDate) VALUES (?, ?, ?); INSERT INTO MissionsCalendar (userId, missionId, missionEntryDate) VALUES (?, ?, ?); INSERT INTO MissionsCalendar (userId, missionId, missionEntryDate) VALUES (?, ?, ?);', [user.userId, listToSend[0].missionId, new Date(), user.userId, listToSend[1].missionId, new Date(), user.userId, listToSend[2].missionId, new Date()], (error, results, fields) => {
                            if (error) {
                                console.log(error);
                                // Add error handling !!!
                            }
                            //console.log(userId)

                        })

                    })








                });
            });





        })


    } catch {
        // Insert error handling
        res.status(500);
        res.json({ message: "Internal server error" })
    }
}



module.exports = {
    addJournalEntries
}