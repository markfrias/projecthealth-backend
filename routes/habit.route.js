const express = require('express');
const { authorize } = require('../auth/authorization');
const habitController = require('../controllers/habit.controller');
const router = express.Router();

router.post("/create", authorize, habitController.createHabit);
router.get('/autocomplete', authorize, habitController.autocompleteHabits);
router.get('/results', authorize, habitController.getSearchedHabits);
router.get('/all', authorize, habitController.getAllHabits);
router.post('/save', authorize, habitController.saveHabit);


module.exports = router;