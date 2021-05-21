var router = require('express').Router();

const routeController = require('../controllers/route.controller');

router.post("/", routeController.create);
router.put("/:id", routeController.update);
router.get("/", routeController.findAll);
router.get("/:id", routeController.findOne);
router.put("/:id", routeController.delete);

module.exports = router;