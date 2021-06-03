var router = require('express').Router();

const reservationController = require('../controllers/reservation.controller');

router.post("/", reservationController.create);
router.put("/:id", reservationController.update);
router.get("/", reservationController.findAll);
// router.get("/datatable", reservationController.findDataTable);
router.get("/:id", reservationController.findOne);
router.delete("/:id", reservationController.delete);

module.exports = router;