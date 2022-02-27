const express = require('express');
const { authorize } = require('../auth/authorization');
const habitController = require('../controllers/habit.controller');
const router = express.Router();

router.post("/create", authorize, habitController.createHabit);
router.get('/autocomplete', authorize, habitController.autocompleteHabits);


module.exports = router;