var router = require('express').Router();

const counterController = require('../controllers/counter.controller');

router.post("/", counterController.create);
router.put("/:id", counterController.update);
router.get("/", counterController.findAll);
// router.get("/datatable", counterController.findDataTable);
router.get("/:id", counterController.findOne);
router.delete("/:id", counterController.delete);

module.exports = router;