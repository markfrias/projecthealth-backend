const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mysql = require('mysql');
const { connection } = require('./dbConfig');
const usersRouter = require('./routes/users.route');
const notificationsRouter = require('./routes/notifications.route');
const cron = require('node-cron');
const { admin } = require('./firebase');
const { startMessageService } = require('./messaging');

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


var registrationToken = "e1I_kfxMtlXIBOYlc1Cvzu:APA91bFNhBuI-44i4Qlu5iA-OGnW4ssfI9GBjxuGx3F2iYArCwutMBVds79ss4SDKB3qqnFKmf3k43l17VZbApSk9ejvDK2vpXTn8VUJQVja2XI-IZ8Gv6M1vBJaYwiZ1n0hAMniwZ94";
var payload = {
    notification: {
        title: "Test Notification",
        body: "This is the body of the notification message."
    }
};

var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

/*
admin.messaging().sendToDevice(registrationToken, payload, options)
    .then(function (response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
        console.log("Error sending message:", error);
    });

/* var topic = "finance";

admin.messaging().subscribeToTopic(registrationToken, topic)
    .then(function (response) {
        console.log("Successfully subscribed to topic:", response);
    })
    .catch(function (error) {
        console.log("Error subscribing to topic:", error);
    });
*/

// Start sending messages if subscriptions want to send messages
startMessageService();















app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

// Establish connection with database
connection.connect((err) => {
    if (err) {
        console.log(err);
    }

    console.log("Successfully connected to database");

});

// Sample database query
/*
connection.query('SELECT * FROM Users', (err, results, fields) => {
    if (err) {
        console.log(err);
    }

    let usersObject = results.map((mysqlObject, index) => {
        return Object.assign({}, mysqlObject);
    });

    sample = usersObject;

    console.log(usersObject);

})
*/

// Routes
app.use('/api/users', usersRouter);
app.use('/api/notifications', notificationsRouter);




