var router = require('express').Router();

const Chart_of_accountController = require('../controllers/Chart_of_account.controller');

router.post("/", Chart_of_accountController.create);
router.put("/:id", Chart_of_accountController.update);
router.get("/", Chart_of_accountController.findAll);
// router.get("/datatable", Chart_of_accountController.findDataTable);
router.get("/:id", Chart_of_accountController.findOne);
router.delete("/:id", Chart_of_accountController.delete);

module.exports = router;