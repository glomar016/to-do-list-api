var router = require('express').Router();

const insuranceController = require('../controllers/insurance.controller');

router.post("/", insuranceController.create);
router.put("/:id", insuranceController.update);
router.get("/", insuranceController.findAll);
// router.get("/datatable", insuranceController.findDataTable);
router.get("/:id", insuranceController.findOne);
router.delete("/:id", insuranceController.delete);

module.exports = router;