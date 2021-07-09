const Table = require('../models/tableModel');
const factoty = require('./../controllers/factoryController.js');
const catchAsync = require('./../utils/catchAsync');

exports.getTable = factoty.getOne(Table);
exports.getAllTables = factoty.getAll(Table)
exports.updateTable = factoty.updateOne(Table);
exports.deleteTable = factoty.deleteOne(Table);

exports.createTable = catchAsync(async (req, res, next) => {

    const request = req.body.table

    let data = []
    let ids = []
    let state = []
    let bulkUpdate = []
    let updateList = []

    for (const item of request) {
        data.push({
            code: item.codigo,
            name: JSON.parse(JSON.stringify(item.nome).replace(/"\s+|\s+"/g, '"')),
            unit: item.unidade,
            price: item.preco,
            state: item.estado
        })
        ids.push(item.codigo)
        state.push(item.estado)
    }

    const updates = await Table.find({ 'code': { $in: ids }, 'state': { $in: state } })

    if (!!updates) {
        for (const item of updates) {
            const result = data.find(data => data.code == item.code && data.state == item.state)
            updateList.push(result)
            const newData = data.filter((data) => data.code !== item.code);
            data = newData
        }
    }

    if (!!updateList) {
        for (const item of updateList) {
            bulkUpdate.push(
                {
                    "updateOne": {
                        "filter": { "code": item.code, 'state': item.state },
                        "update": { "$set": { "price": item.price } }
                    }
                }
            );
        }
        await Table.bulkWrite(bulkUpdate)
    }

    if (!!data) {
        await Table.insertMany(data)
    }

    res.status(201).json({
        status: 'success'
    });
})