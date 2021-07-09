const express = require("express");
const router = express.Router();
const DataController = require('../controllers/dataController')

router
    .route('/')
    .post(DataController.createData)
    .get(DataController.getAllDatas)

router
    .route('/:id')
    .get(DataController.getData)
    .patch(DataController.updateData)
    .delete(DataController.deleteData)

module.exports = router;