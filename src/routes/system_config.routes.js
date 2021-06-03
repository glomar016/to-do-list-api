var router = require('express').Router();

const systemConfigController = require('../controllers/system_config.controller');

router.post("/", systemConfigController.create);
router.put("/:id", systemConfigController.update);
router.get("/", systemConfigController.findAll);
router.get("/:id", systemConfigController.findOne);
router.delete("/:id", systemConfigController.delete);

module.exports = router;