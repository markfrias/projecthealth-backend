const express = require('express');
const { authorize } = require('../auth/authorization');
const foodControllers = require('../controllers/food.controller');
const router = express.Router();

router.post("/createEntry", authorize, foodControllers.createFoodEntry);
router.get("/entry/day/agg", authorize, foodControllers.getJournalEntries);


module.exports = router;