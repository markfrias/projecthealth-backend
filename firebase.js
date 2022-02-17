const admin = require("firebase-admin");
var serviceAccount = require("./google-credentials.json");

// Setup Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


module.exports = {
    admin
}