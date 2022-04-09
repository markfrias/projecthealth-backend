const express = require('express');
const app = express();
const userControllers = require('../controllers/users.controller');
const router = express.Router();
const { authorize } = require('../auth/authorization');



router.get("/", authorize, userControllers.getUsers);
router.post("/register", userControllers.registerUser);
router.post("/login", userControllers.loginUser);
router.get('/calorieBudget', authorize, userControllers.getCalorieBudget);
router.patch('/modify-weight', authorize, userControllers.updateWeightAndHeight);
router.delete('/delete', authorize, userControllers.deleteAccount);
router.get('/progress-report', authorize, userControllers.getProgressReport);
router.patch('/progress/update', authorize, userControllers.updateProgress);

module.exports = router;