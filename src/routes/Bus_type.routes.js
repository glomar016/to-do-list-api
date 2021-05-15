var router = require('express').Router();

const busTypeController = require('../controllers/Bus_type.controller');

router.post("/", busTypeController.create);
router.put("/:id", busTypeController.update);
router.get("/", busTypeController.findAll);
// router.get("/datatable", busTypeController.findDataTable);
router.get("/:id", busTypeController.findOne);
router.delete("/:id", busTypeController.delete);

module.exports = router;