const { admin } = require('./firebase')
const cron = require('node-cron');

// Functions for different topic (schedule) notifications per hour of the day

// Custom message variable
let customMessage = "lunch";

// Notification template
let payload = {
    notification: {
        title: "Healevate Reminder",
        body: `It's time to log your ${customMessage}. Your gotchi is getting hungry.`
    }
};


// Triggers midnight notifications on subscribed devices
const triggerMidnightNotif = () => {

    // Set custom message
    customMessage = "midnight snack";

    cron.schedule('0 0 * * *', () => {
        admin.messaging().sendToTopic("midnight", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 1am notifications on subscribed devices
const triggerOneNotif = () => {

    // Set custom message
    customMessage = "midnight snack";

    cron.schedule('0 1 * * *', () => {
        admin.messaging().sendToTopic("one", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 2am notifications on subscribed devices
const triggerTwoNotif = () => {

    // Set custom message
    customMessage = "midnight snack";

    cron.schedule('0 2 * * *', () => {
        admin.messaging().sendToTopic("two", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 3am notifications on subscribed devices
const triggerThreeNotif = () => {

    // Set custom message
    customMessage = "midnight snack";

    cron.schedule('0 3 * * *', () => {
        admin.messaging().sendToTopic("three", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 4am notifications on subscribed devices
const triggerFourNotif = () => {

    // Set custom message
    customMessage = "breakfast";

    cron.schedule('0 4 * * *', () => {
        admin.messaging().sendToTopic("four", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 5am notifications on subscribed devices
const triggerFiveNotif = () => {

    // Set custom message
    customMessage = "breakfast";

    cron.schedule('0 5 * * *', () => {
        admin.messaging().sendToTopic("five", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 6am notifications on subscribed devices
const triggerSixNotif = () => {

    // Set custom message
    customMessage = "breakfast";

    cron.schedule('0 6 * * *', () => {
        admin.messaging().sendToTopic("six", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 7am notifications on subscribed devices
const triggerSevenNotif = () => {

    // Set custom message
    customMessage = "breakfast";

    cron.schedule('0 7 * * *', () => {
        admin.messaging().sendToTopic("seven", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 8am notifications on subscribed devices
const triggerEightNotif = () => {

    // Set custom message
    customMessage = "breakfast";

    cron.schedule('0 8 * * *', () => {
        admin.messaging().sendToTopic("eight", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 9am notifications on subscribed devices
const triggerNineNotif = () => {

    // Set custom message
    customMessage = "breakfast";

    cron.schedule('0 9 * * *', () => {
        admin.messaging().sendToTopic("nine", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 10am notifications on subscribed devices
const triggerTenNotif = () => {

    // Set custom message
    customMessage = "breakfast";

    cron.schedule('0 10 * * *', () => {
        admin.messaging().sendToTopic("ten", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 5am notifications on subscribed devices
const triggerElevenNotif = () => {

    // Set custom message
    customMessage = "lunch";

    cron.schedule('0 11 * * *', () => {
        admin.messaging().sendToTopic("eleven", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 12pm notifications on subscribed devices
const triggerTwelveNotif = () => {

    // Set custom message
    customMessage = "lunch";

    cron.schedule('0 12 * * *', () => {
        admin.messaging().sendToTopic("twelve", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 1pm notifications on subscribed devices
const triggerThirteenNotif = () => {

    // Set custom message
    customMessage = "lunch";

    cron.schedule('0 13 * * *', () => {
        admin.messaging().sendToTopic("thirteen", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 2pm notifications on subscribed devices
const triggerFourteenNotif = () => {

    // Set custom message
    customMessage = "lunch";

    cron.schedule('0 14 * * *', () => {
        admin.messaging().sendToTopic("fourteen", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 3pm notifications on subscribed devices
const triggerFifteenNotif = () => {

    // Set custom message
    customMessage = "lunch";

    cron.schedule('0 15 * * *', () => {
        admin.messaging().sendToTopic("fifteen", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 4pm notifications on subscribed devices
const triggerSixteenNotif = () => {

    // Set custom message
    customMessage = "lunch";

    cron.schedule('0 16 * * *', () => {
        admin.messaging().sendToTopic("sixteen", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 5pm notifications on subscribed devices
const triggerSeventeenNotif = () => {

    // Set custom message
    customMessage = "dinner";

    cron.schedule('0 17 * * *', () => {
        admin.messaging().sendToTopic("seventeen", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 6pm notifications on subscribed devices
const triggerEighteenNotif = () => {

    // Set custom message
    customMessage = "dinner";

    cron.schedule('0 18 * * *', () => {
        admin.messaging().sendToTopic("eighteen", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 7pm notifications on subscribed devices
const triggerNineteenNotif = () => {

    // Set custom message
    customMessage = "dinner";

    cron.schedule('0 19 * * *', () => {
        admin.messaging().sendToTopic("nineteen", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 8pm notifications on subscribed devices
const triggerTwentyNotif = () => {

    // Set custom message
    customMessage = "dinner";

    cron.schedule('0 20 * * *', () => {
        admin.messaging().sendToTopic("twenty", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 9pm notifications on subscribed devices
const triggerTwentyOneNotif = () => {

    // Set custom message
    customMessage = "dinner";

    cron.schedule('0 21 * * *', () => {
        admin.messaging().sendToTopic("twentyOne", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 10pm notifications on subscribed devices
const triggerTwentyTwoNotif = () => {

    // Set custom message
    customMessage = "dinner";

    cron.schedule('0 22 * * *', () => {
        admin.messaging().sendToTopic("twentyTwo", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}

// Triggers 11pm notifications on subscribed devices
const triggerTwentyThreeNotif = () => {

    // Set custom message
    customMessage = "midnight snack";

    cron.schedule('0 23 * * *', () => {
        admin.messaging().sendToTopic("twentyThree", payload)
            .then(function (response) {
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                console.log("Error sending message:", error);
            });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
}



module.exports = {
    triggerMidnightNotif, triggerOneNotif, triggerTwoNotif, triggerThreeNotif, triggerFourNotif, triggerFiveNotif, triggerSixNotif, triggerSevenNotif, triggerEightNotif, triggerNineNotif, triggerTenNotif, triggerElevenNotif, triggerTwelveNotif, triggerThirteenNotif, triggerFourteenNotif, triggerFifteenNotif, triggerSixteenNotif, triggerSeventeenNotif, triggerEighteenNotif, triggerNineteenNotif, triggerTwentyNotif, triggerTwentyOneNotif, triggerTwentyTwoNotif, triggerTwentyThreeNotif
}