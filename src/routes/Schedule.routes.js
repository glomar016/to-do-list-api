var router = require('express').Router();

const Schedule = require('../controllers/Schedule.controller');

router.post("/", Schedule.create);
router.put("/:id", Schedule.update);
router.get("/", Schedule.findAll);
router.get("/availBus/:selectedDay", Schedule.findAllAvailBus);
router.get("/:id", Schedule.findOne);
router.get("/get_specific_schedule/:id", Schedule.get_specific_schedule);
router.delete("/:id", Schedule.delete);

module.exports = router;