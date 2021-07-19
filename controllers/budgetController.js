const Budget = require('../models/budgetModel');
const Der = require('../models/derModel');
const Sicro = require('../models/sicroModel');
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

    for (const item of request.table) {
        data.push({
            Estrutura: item.Estrutura,
            Código: item.Código,
            Descrição: item.Descrição,
            Unid: item.Unid,
            Quant: item.Quant,
            Unit: "",
            Total: ""
        })
        ids.push(item.Código)
    }

    if(request.company === 'arteris' & request.database === "der") {
        const updates = await Der.find({ 'arteris': { $in: ids }, 'state': request.state.toUpperCase() })

        if (!!updates) {
            for (const item of updates) {
                const result = data.find(data => data.Código == item.arteris && item.state == request.state.toUpperCase())
                result.Unit = Number((request.tax / 100) * item.price) + Number(item.price)
                result.Total = result.Quant * result.Unit              
            }
        }
    }

    if(request.company === 'arteris' & request.database === "sicro") {
        const updates = await Sicro.find({ 'arteris': { $in: ids }, 'state': request.state.toUpperCase() })       

        if (!!updates) {
            for (const item of updates) {
                const result = data.find(data => data.Código == item.arteris && item.state == request.state.toUpperCase())
                result.Unit = Number((request.tax / 100) * item.price) + Number(item.price)
                result.Total = result.Quant * result.Unit            
            }
        }
    }
    
    if(request.company === 'CCR' & request.database === "der") {
        const updates = await Der.find({ 'CCR': { $in: ids }, 'state': request.state.toUpperCase() })

        if (!!updates) {
            for (const item of updates) {
                const result = data.find(data => data.Código == item.CCR && item.state == request.state.toUpperCase())
                result.Unit = Number((request.tax / 100) * item.price) + Number(item.price)
                result.Total = result.Quant * result.Unit                 
            }
        }
    }

    if(request.company === 'CCR' & request.database === "sicro") {
        const updates = await Sicro.find({ 'CCR': { $in: ids }, 'state': request.state.toUpperCase() })

        if (!!updates) {
            for (const item of updates) {
                const result = data.find(data => data.Código == item.CCR && item.state == request.state.toUpperCase())
                result.Unit = Number((request.tax / 100) * item.price) + Number(item.price)
                result.Total = result.Quant * result.Unit                
            }
        }
    }   

    res.status(201).json({
        data: data
    });
})