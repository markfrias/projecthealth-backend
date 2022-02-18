const express = require('express');
const { authorize } = require('../auth/authorization');
const notificationsControllers = require('../controllers/notifications.controller');
const router = express.Router();

router.post("/subscribe", authorize, notificationsControllers.subscribeToReminders);


module.exports = router;