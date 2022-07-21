const axios = require('axios');

exports.initializePayment = async (email, amount, callback) => {
  const params = JSON.stringify({
    email: email,
    amount: amount,
    currency: 'NGN',
    callback_url: callback,
  });
  try {
    const data = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      params,
      {
        headers: {
          Authorization: process.env.PAYSTACK_SECRET_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  } catch (err) {
    console.error('error ', err.res);
  }
};

exports.verifyPayment = async (ref) => {
  try {
    const verified = await axios.get(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        headers: {
          Authorization: process.env.PAYSTACK_SECRET_KEY,
        },
      }
    );

    return verified.data.data.customer;
  } catch (err) {
    console.error('error', err);
  }
};
7;
