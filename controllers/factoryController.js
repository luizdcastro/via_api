const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatues');


exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);


        res.status(201).json({
            status: 'success',
            data: doc,
        });
    });

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        const features = new APIFeatures(Model.find(), req.query, snapshot = true)
            .filter()
            .sort()
            .limitFields()

        const doc = await features.query;

        res.status(200).json(doc);
    });

exports.getOne = (Model, popOptins) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptins) query = query.populate(popOptins);
        const doc = await query;

        res.status(200).json([doc]);
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data: doc,
        });
    });

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    });
