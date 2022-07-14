import axios from 'axios';

export const initializePayment = async (email, amount) => {
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
    console.log('heyyyy');
    return data;
  } catch (err) {
    console.error('error ', err.res);
  }
};

export const verifyPayment = async (ref) => {
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
    return res;
  } catch (err) {
    console.error('error', err.res);
  }
};
