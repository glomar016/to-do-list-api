var router = require('express').Router();

const paymentController = require('../controllers/payment.controller');

router.post("/", paymentController.create);
router.put("/:id", paymentController.update);
router.get("/", paymentController.findAll);
router.get("/show_user_payment/:id", paymentController.show_user_payment);
// router.get("/datatable", paymentController.findDataTable);
router.get("/:id", paymentController.findOne);
router.delete("/:id", paymentController.delete);

module.exports = router;