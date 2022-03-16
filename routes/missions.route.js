const express = require('express');
const app = express();
const missionsController = require('../controllers/missions.controller');
const router = express.Router();
const { authorize } = require('../auth/authorization');



router.get("/journal/get-all", authorize, missionsController.getUserMissions);
router.patch("/journal/update", authorize, missionsController.updateMissionStatus);


module.exports = router;