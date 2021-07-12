const express = require("express");
const router = express.Router();
const BudgetController = require('../controllers/budgetController')

router
    .route('/')
    .post(BudgetController.createBudget)
    .get(BudgetController.getAllBudgets)

router
    .route('/:id')
    .get(BudgetController.getBudget)
    .patch(BudgetController.updateBudget)
    .delete(BudgetController.deleteBudget)

module.exports = router;