import axios from 'axios';

export const CreatePaymentIntent = data => {
  return axios
    .post('http://192.168.1.15:5000/create-payment-intent', data)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err;
    });
};
