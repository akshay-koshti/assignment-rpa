const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');

exports.getMe = catchAsync(async (req, res, next) => {
  const userDoc = await User.findOne({ _id: req.user._id });

  res.status(200).json({
    status: 'success',
    data: userDoc
  });
});
