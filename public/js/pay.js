import axios from 'axios';
import { showAlert } from './alert';
export const bookTour = async (tourId) => {
  //1) get bookInitialization from the booktour api
  try {
    const session = await axios(`/api/v1/bookings/bookTour/${tourId}`);
    const url = session.data.data.authorization_url;
    //2)redirect to authorization url
    window.location.href = url;
  } catch (err) {
    console.log(err.name, err.message);
    showAlert('error', err);
  }
};
