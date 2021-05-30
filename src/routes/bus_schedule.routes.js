var router = require('express').Router();

const busSchedule = require('../controllers/bus_schedule.controller');

router.post("/", busSchedule.create);
router.put("/:id", busSchedule.update);
router.get("/", busSchedule.findAll);
router.get("/:id", busSchedule.findOne);
router.delete("/:id", busSchedule.delete);

module.exports = router;