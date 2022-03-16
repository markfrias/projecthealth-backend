const express = require('express');
const app = express();
const userControllers = require('../controllers/missions.controller');
const router = express.Router();
const { authorize } = require('../auth/authorization');



router.get("/journal/add", authorize, userControllers.addJournalEntries);


module.exports = router;