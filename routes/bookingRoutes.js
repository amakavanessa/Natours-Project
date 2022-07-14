const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/bookTour/:tourId')
  .post(authController.protect, bookingController.bookTour);
// .get(bookingController.verifyPayment);

module.exports = router;
