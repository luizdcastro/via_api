const express = require("express");
const router = express.Router();
const SicroController = require('../controllers/sicroController')

router
    .route('/')
    .post(SicroController.createSicro)
    .get(SicroController.getAllSicros)

router
    .route('/:id')
    .get(SicroController.getSicro)
    .patch(SicroController.updateSicro)
    .delete(SicroController.deleteSicro)

module.exports = router;