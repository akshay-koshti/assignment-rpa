const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Wallet = require('../models/walletModel');
const AppError = require('../utils/appError');

exports.getAmount = catchAsync(async (req, res, next) => {
    let walletDoc = await Wallet.findOne({ user: req.user._id });
    if (!walletDoc) {
        walletDoc = await Wallet.create({ user: req.user._id });
    }

    res.status(200).json({
        status: 'success',
        data: walletDoc.totalAmount
    });
});

exports.debitAmount = catchAsync(async (req, res, next) => {
    if (!req.body.amount) {
        return next(new appError('Please provide the amount', 401));
    }

    let walletDoc = await Wallet.findOneAndUpdate(
        { user: req.user._id },
        { $inc: { totalAmount: req.body.amount } },
        { new: true, runValidators: true });
    if (!walletDoc) {
        walletDoc.create({ userId: req.user._id, totalAmount: req.body.amount });
    }
    res.status(200).json({
        status: 'success',
        data: walletDoc.totalAmount
    });
});

exports.creditAmount = catchAsync(async (req, res, next) => {
    if (!req.body.amount) {
        return next(new appError('Please provide the amount', 401));
    }

    const walletDoc = await Wallet.findOneAndUpdate(
        { user: req.user._id },
        { $inc: { totalAmount: -req.body.amount } },
        { new: true, runValidators: true });

    res.status(200).json({
        status: 'success',
        data: walletDoc.totalAmount
    });
});
