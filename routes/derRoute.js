const express = require("express");
const router = express.Router();
const DerController = require('../controllers/derController')

router
    .route('/')
    .post(DerController.createDer)
    .get(DerController.getAllDers)

router
    .route('/:id')
    .get(DerController.getDer)
    .patch(DerController.updateDer)
    .delete(DerController.deleteDer)

module.exports = router;