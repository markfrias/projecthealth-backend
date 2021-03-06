const express = require('express');
const { authorize } = require('../auth/authorization');
const foodControllers = require('../controllers/food.controller');
const router = express.Router();

router.post("/createEntry", authorize, foodControllers.createFoodEntry);
router.get("/entry/day/agg", authorize, foodControllers.getJournalEntries);
router.get(`/entry`, authorize, foodControllers.getJournalEntriesOnMonth);
router.get("/entry/day", authorize, foodControllers.getJournalEntriesOnDay);
router.get("/streaks", authorize, foodControllers.getFoodJournalStreaks);
router.patch("/streaks/update", authorize, foodControllers.updateStreaks);


module.exports = router;