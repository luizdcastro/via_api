const User = require('../models/userModel');
const factory = require('./../controllers/factoryController');
const catchAsync = require('./../utils/catchAsync');

exports.getAllusers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.getMe = (req, res, next) => {
    req.params.id = req.userId;
    next();
};

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)
       
    res.status(200).json({
        status: 'success',
        data: user,
    });
})

exports.updateMe = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: 'success',
        data: user,
    });
});