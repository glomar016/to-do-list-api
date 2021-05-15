var router = require('express').Router();

const landmarkController = require('../controllers/landmark.controller');

router.post("/", landmarkController.create);
router.put("/:id", landmarkController.update);
router.get("/", landmarkController.findAll);
router.get("/datatable", landmarkController.findDataTable);
router.get("/:id", landmarkController.findOne);
router.delete("/:id", landmarkController.delete);

module.exports = router;