var router = require('express').Router();

const busRegistrationController = require('../controllers/bus_registration.controller');

router.post("/", busRegistrationController.create);
router.put("/:id", busRegistrationController.update);
router.get("/", busRegistrationController.findAll);
// router.get("/datatable", busRegistrationController.findDataTable);
router.get("/:id", busRegistrationController.findOne);
router.delete("/:id", busRegistrationController.delete);

module.exports = router;