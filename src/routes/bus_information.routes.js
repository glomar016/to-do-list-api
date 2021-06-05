var router = require('express').Router();

const busInformation = require('../controllers/bus_information.controller');

router.post("/", busInformation.create);
router.put("/:id", busInformation.update);
router.get("/", busInformation.findAll);
router.get("/:id", busInformation.findOne);
router.delete("/:id", busInformation.delete);
router.get("/reqBusType/:reqBusType", busInformation.findSpecificBusType);

module.exports = router;