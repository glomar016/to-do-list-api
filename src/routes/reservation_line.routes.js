var router = require('express').Router();

const reservation_lineController = require('../controllers/reservation_line.controller');

router.post("/", reservation_lineController.create);
router.post("/bulkCreate", reservation_lineController.bulkCreate);
router.put("/:id", reservation_lineController.update);
router.get("/", reservation_lineController.findAll);
// router.get("/datatable", reservation_lineController.findDataTable);
router.get("/:id", reservation_lineController.findOne);
router.delete("/:id", reservation_lineController.delete);

module.exports = router;