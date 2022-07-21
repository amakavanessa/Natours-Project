const Tour = require('../model/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const paystack = require('../utils/paystack');
const Booking = require('../model/bookingModel');
const factory = require('./handlerFactory');

exports.bookInit = catchAsync(async (req, res) => {
  const tour = await Tour.findById(req.params.tourId);
  const email = req.user.email;
  const user = req.user.id;
  const amount = tour.price * 100;
  const callback = `${req.protocol}://${req.get('host')}/verification/?tour=${
    req.params.tourId
  }&user=${req.user.id}&price=${tour.price}`;

  const { data } = await paystack.initializePayment(email, amount, callback);
  const url = data.data.authorization_url;
  res.status(200).json({
    status: true,
    data: data.data,
  });
});

exports.verify = catchAsync(async (req, res) => {
  const ref = req.query.reference;
  const ses = await paystack.verifyPayment(ref);
  const user = req.user.id;
  res.status(200).json({
    status: true,
    data: ses,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
  const { tour, user, price } = req.query;

  if (!tour && !user && !price) return next();
  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
