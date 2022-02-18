const { connection } = require('../dbConfig');
const { admin } = require('../firebase');
const jwt = require('jsonwebtoken');


// Saves reminder preference to server (create if nothing exists, update if a record exists), subscribes to preference topics, unsubscribes to replaced topics via registration token
const subscribeToReminders = async (req, res) => {
    let jwtoken = req.headers.authorization.slice(7);

    // Assign request body values to variables
    const { breakfastTime, lunchTime, dinnerTime, registrationToken } = req.body;

    try {


        // Check if preferences exist
        connection.query("SELECT * FROM UserNotifications WHERE userId=?;", [req.body.userId], (error, results, fields) => {
            if (error) {
                res.status(500);
                return res.json({ message: "Server error" });
            }



            // Create new entry when records don't exist
            if (results.length === 0) {
                connection.query("INSERT INTO UserNotifications VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?);", [req.body.userId, "breakfast", breakfastTime, req.body.userId, "lunch", lunchTime, req.body.userId, "dinner", dinnerTime], (error, results, fields) => {
                    if (error) {
                        console.log(error);
                        res.status(500);
                        return res.json({ message: "Server error" });
                    }

                    // Subscribe device to topics
                    // Subscribe the devices corresponding to the registration tokens to the
                    // topic.

                    try {
                        admin.messaging().subscribeToTopic(registrationToken, breakfastTime)
                            .then((response) => {

                                console.log('Successfully subscribed to topic:', response);


                                admin.messaging().subscribeToTopic(registrationToken, lunchTime)
                                    .then((response) => {

                                        console.log('Successfully subscribed to topic:', response);
                                        admin.messaging().subscribeToTopic(registrationToken, dinnerTime)
                                            .then((response) => {

                                                console.log('Successfully subscribed to topic:', response);
                                                res.json(results);
                                            })
                                            .catch((error) => {
                                                console.log('Error subscribing to topic:', error);
                                            });
                                    })
                                    .catch((error) => {
                                        console.log('Error subscribing to topic:', error);
                                    });

                            })
                            .catch((error) => {
                                console.log('Error subscribing to topic:', error);
                            });
                    } catch (error) {
                        res.status(500);
                        return res.json("Internal server error or missing input");
                    }

                })
            } else {

                // Assign topics from DB to variable
                const prevTopics = results.map((data) => data.reminderTime);

                connection.query("UPDATE UserNotifications SET reminderTime=? WHERE userId=? AND mealType=?; UPDATE UserNotifications SET reminderTime=? WHERE userId=? AND mealType=?; UPDATE UserNotifications SET reminderTime=? WHERE userId=? AND mealType=?; ", [breakfastTime, req.body.userId, "breakfast", lunchTime, req.body.userId, "lunch", dinnerTime, req.body.userId, "dinner"], (error, results, fields) => {
                    if (error) {
                        console.log(error);
                        res.status(500);
                        return res.json({ message: "Server error" });
                    }

                    // Subscribe device to topics
                    // Subscribe the devices corresponding to the registration tokens to the
                    // topic.
                    try {
                        admin.messaging().subscribeToTopic(registrationToken, breakfastTime)
                            .then((response) => {

                                console.log('Successfully subscribed to topic:', response);


                                admin.messaging().subscribeToTopic(registrationToken, lunchTime)
                                    .then((response) => {

                                        console.log('Successfully subscribed to topic:', response);
                                        admin.messaging().subscribeToTopic(registrationToken, dinnerTime)
                                            .then((response) => {

                                                console.log('Successfully subscribed to topic:', response);
                                                res.json(results);

                                                // Unsubscribe to old topics
                                                unsubscribe(prevTopics);
                                            })
                                            .catch((error) => {
                                                console.log('Error subscribing to topic:', error);
                                            });
                                    })
                                    .catch((error) => {
                                        console.log('Error subscribing to topic:', error);
                                    });

                            })
                            .catch((error) => {
                                console.log('Error subscribing to topic:', error);
                            });
                    } catch (error) {
                        res.status(500);
                        return res.json({ message: "Internal server error or missing input" });
                    }
                })
            }


        });

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



    const unsubscribe = (previousTopics) => {
        console.log(previousTopics);
        const newTopics = [breakfastTime, lunchTime, dinnerTime];
        console.log(newTopics)
        // Find topics to unsubscribe (return unmatched topic in the old list)
        const topicsToUnsub = previousTopics.filter((topic) => {
            let isMatch = false;
            for (let i = 0; i < newTopics.length; i++) {
                if (topic.includes(newTopics[i])) {
                    isMatch = true;

                }


            }
            if (isMatch) {
                return false;
            } else {
                return true;
            }
        })

        // Unsub from topic/s
        topicsToUnsub.forEach((data) => {
            // Unsubscribe the devices corresponding to the registration tokens from
            // the topic.
            admin.messaging().unsubscribeFromTopic(registrationToken, data)
                .then((response) => {
                    // See the MessagingTopicManagementResponse reference documentation
                    // for the contents of response.
                    console.log('Successfully unsubscribed from topic:', response);
                })
                .catch((error) => {
                    console.log('Error unsubscribing from topic:', error);
                });
        })
    }
}



module.exports = {
    subscribeToReminders
}