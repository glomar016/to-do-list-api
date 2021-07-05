var router = require('express').Router();

const promoController = require('../controllers/promo.controller');

router.post("/", promoController.create);
router.put("/:id", promoController.update);
router.get("/", promoController.findAll);
router.get("/:id", promoController.findOne);
router.get("/reservation/:promoCode", promoController.findOnePromo);
router.delete("/:id", promoController.delete);

module.exports = router;