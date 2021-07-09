const Data = require('../models/dataModel');
const factoty = require('./../controllers/factoryController.js');

exports.createData = factoty.createOne(Data);
exports.getData = factoty.getOne(Data);
exports.getAllDatas = factoty.getAll(Data)
exports.updateData = factoty.updateOne(Data);
exports.deleteData = factoty.deleteOne(Data);