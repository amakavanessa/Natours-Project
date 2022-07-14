const Tour = require('./../model/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const paystack = require('../utils/paystack');

exports.bookTour = catchAsync(async (req, next) => {
  const tour = await Tour.findById(req.params.tourId);
  const email = req.user.email;
  const amount = tour.price * 100;

  const data = await paystack.initializePayment(email, amount);
  const ref = data.data.data.reference;
  console.log(data.data);
  // await paystack.verifyPayment(ref);
});
