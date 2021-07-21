var router = require('express').Router();

const Bus_seatController = require('../controllers/Bus_seat.controller');

router.post("/", Bus_seatController.create);
router.post("/createBusSeats", Bus_seatController.createBusSeats);
router.post("/createBusInformationSeats", Bus_seatController.createBusInformationSeats);
router.put("/:id", Bus_seatController.update);
router.get("/:id", Bus_seatController.findAll);
router.get("/findAllTemplate/:id", Bus_seatController.findAllTemplate);
// router.get("/datatable", Bus_seatController.findDataTable);
router.get("/findOne/:id", Bus_seatController.findOne);
router.delete("/:id", Bus_seatController.delete);

module.exports = router;