var router = require('express').Router();

const routeController = require('../controllers/route.controller');

router.post("/", routeController.create);
router.put("/:id", routeController.update);
router.get("/", routeController.findAll);
router.get("/dashboard/:date", routeController.findAllDashboard);
router.get("/origin/:originId", routeController.findAllOrigin);
router.get("/:id", routeController.findOne);
router.put("/:id", routeController.delete);

module.exports = router;