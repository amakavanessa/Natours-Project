const axios = require('axios');
const express = require('express');
const paystack = require('paystack-node');

exports.initializePayment = async (email, amount) => {
  const params = JSON.stringify({
    email: email,
    amount: amount,
    currency: 'NGN',
    // channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
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
  console.log(ref);
  try {
    const res = await axios.get(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        headers: {
          Authorization: process.env.PAYSTACK_SECRET_KEY,
        },
      }
    );
    console.log(res.data);
  } catch (err) {
    console.error('error', err.res);
  }
};
