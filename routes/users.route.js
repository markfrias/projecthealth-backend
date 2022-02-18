const express = require('express');
const app = express();
const userControllers = require('../controllers/users.controller');
const router = express.Router();
const { authorize } = require('../auth/authorization');



router.get("/", authorize, userControllers.getUsers);
router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);

module.exports = router;