var router = require('express').Router();

const Bus_templateController = require('../controllers/Bus_template.controller');

router.post("/", Bus_templateController.create);
router.put("/:id", Bus_templateController.update);
router.get("/", Bus_templateController.findAll);
// router.get("/datatable", Bus_templateController.findDataTable);
router.get("/:id", Bus_templateController.findOne);
router.delete("/:id", Bus_templateController.delete);

module.exports = router;