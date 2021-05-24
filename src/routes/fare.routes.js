var router = require('express').Router();

const fareController = require('../controllers/fare.controller');

router.post("/", fareController.create);
router.get("/", fareController.findAll);
router.get("/:id", fareController.findOne);
router.put("/:id", fareController.update);
router.put("/:id", fareController.delete);

module.exports = router;