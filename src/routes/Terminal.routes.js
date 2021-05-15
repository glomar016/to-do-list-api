var router = require('express').Router();

const terminalController = require('../controllers/Terminal.controller');

router.post("/", terminalController.create);
router.put("/:id", terminalController.update);
router.get("/", terminalController.findAll);
// router.get("/datatable", terminalController.findDataTable);
router.get("/:id", terminalController.findOne);
router.delete("/:id", terminalController.delete);

module.exports = router;