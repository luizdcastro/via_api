const Sicro = require('../models/sicroModel');
const factory = require('./factoryController.js');
const catchAsync = require('../utils/catchAsync');

exports.getSicro = factory.getOne(Sicro);
exports.getAllSicros = factory.getAll(Sicro)
exports.updateSicro = factory.updateOne(Sicro);
exports.deleteSicro = factory.deleteOne(Sicro);

exports.createSicro = catchAsync(async (req, res, next) => {

    const request = req.body.sicro

    let data = []
    let ids = []
    let state = []
    let bulkUpdate = []
    let updateList = []

    for (const item of request.table) {
        data.push({
            code: item.codigo,
            name: JSON.parse(JSON.stringify(item.nome).replace(/"\s+|\s+"/g, '"')),
            unit: item.unidade,
            price: item.preco,
            state: request.state.toUpperCase()
        })
        ids.push(item.codigo)
        state.push(request.state.toUpperCase())
    }

    const updates = await Sicro.find({ 'code': { $in: ids }, 'state': { $in: state } })

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
        await Sicro.bulkWrite(bulkUpdate)
    }

    if (!!data) {
        await Sicro.insertMany(data)
    }

    res.status(201).json({
        status: 'success'
    });
})