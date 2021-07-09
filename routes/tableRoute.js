const express = require("express");
const router = express.Router();
const TableController = require('../controllers/tableController')

router
    .route('/')
    .post(TableController.createTable)
    .get(TableController.getAllTables)

router
    .route('/:id')
    .get(TableController.getTable)
    .patch(TableController.updateTable)
    .delete(TableController.deleteTable)

module.exports = router;