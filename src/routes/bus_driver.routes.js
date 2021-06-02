var router = require('express').Router();

const bus_driverController = require('../controllers/bus_driver.controller');

router.post("/", bus_driverController.create);
router.put("/:id", bus_driverController.update);
router.get("/", bus_driverController.findAll);
// router.get("/datatable", bus_driverController.findDataTable);
router.get("/:id", bus_driverController.findOne);
router.delete("/:id", bus_driverController.delete);

module.exports = router;