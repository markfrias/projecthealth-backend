const express = require('express');
const userControllers = require('../controllers/users.controller');
const router = express.Router();

router.get("/", userControllers.getUsers);
router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);

module.exports = router;