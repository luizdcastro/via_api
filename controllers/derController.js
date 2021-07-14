const Der = require('../models/derModel');
const factory = require('./factoryController.js');
const catchAsync = require('../utils/catchAsync');

exports.getDer = factory.getOne(Der);
exports.getAllDers = factory.getAll(Der)
exports.updateDer = factory.updateOne(Der);
exports.deleteDer = factory.deleteOne(Der);

exports.createDer = catchAsync(async (req, res, next) => {

    const request = req.body.der

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

    const updates = await Der.find({ 'code': { $in: ids }, 'state': { $in: state } })

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
        await Der.bulkWrite(bulkUpdate)
    }

    if (!!data) {
        await Der.insertMany(data)
    }

    res.status(201).json({
        status: 'success'
    });
})