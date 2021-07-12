const Budget = require('../models/budgetModel');
const Table = require('../models/tableModel');
const factory = require('./../controllers/factoryController.js');
const catchAsync = require('./../utils/catchAsync');


exports.getBudget = factory.getOne(Budget);
exports.getAllBudgets = factory.getAll(Budget)
exports.updateBudget = factory.updateOne(Budget);
exports.deleteBudget = factory.deleteOne(Budget);

exports.createBudget = catchAsync(async (req, res, next) => {

    const request = req.body.budget
    let data = []
    let ids = []

    for (const item of request) {
        data.push({
            estrutura: item.estrutura,
            code: item.código,
            descrição: item.descrição,
            unid: item.unid,
            quant: item.quant,
            unit: item.unit,
            total: item.total
        })
        ids.push(item.código)
    }

    const updates = await Table.find({ 'arteris': { $in: ids }, 'state': 'SP' })

    if (!!updates) {
        for (const item of updates) {
            const result = data.find(data => data.code == item.arteris && item.state == "SP")
            result.unit = item.price
            result.total = result.quant * item.price             
        }
    }

    res.status(201).json({
        data: data
    });
})