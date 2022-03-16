const moment = require('moment');
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

const getUserMissions = (req, res) => {
    const userId = req.body.userId;

    try {
        connection.query('SELECT MissionsCalendar.missionEntryId, MissionsCalendar.missionId, MissionsCalendar.missionAccomplished, Missions.missionName FROM Missions JOIN MissionsCalendar ON MissionsCalendar.missionId = Missions.missionId WHERE userId=? AND MissionsCalendar.missionEntryDate = ?', [userId, moment().format('YYYY-MM-DD')], (error, results, fields) => {
            if (error) {
                // Add error handling
                res.status(500);
                console.error(error);
                return res.json({ message: "Internal server error" });
            }

            // Response when query is successful
            res.json(results);
        })
    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({ message: "Internal server error" });
    }
}

const updateMissionStatus = (req, res) => {
    const { missionEntryId, missionAccomplished } = req.body;
    try {
        connection.query('UPDATE MissionsCalendar SET missionAccomplished = ? WHERE missionEntryId=?', [missionAccomplished, missionEntryId], (error, results, fields) => {
            if (error) {
                // Add error handling
                res.status(500);
                return res.json({ message: "Internal server error" });
            }

            // Response when query is successful
            console.log(results);
            res.json(results);
        })
    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({ message: "Internal server error" });
    }
}



module.exports = {
    addJournalEntries, getUserMissions, updateMissionStatus
}