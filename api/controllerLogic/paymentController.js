const paymentBusiness = require('../businessLogic/paymentBusiness');


const initiatePayment = (req, res) => {
  paymentBusiness.initiatePayment(req.body).then(async (response) => {
    res.status(200).send(response)
  }).catch(async (error) => {
    res.status(error.status).send(response)
  });
};

const confirmPayment = (req, res) => {
  paymentBusiness.confirmPayment(req.body).then(async (response) => {
    res.status(200).send(response)
  }).catch(async (error) => {
    res.status(error.status).send(response)
  });
};

const getPaymentStatus = (req, res) => {
  paymentBusiness.getPaymentStatus(req.params).then(async (response) => {
    res.status(200).send(response)
  }).catch(async (error) => {
    res.status(error.status).send(response)
  });
};

module.exports = {
  initiatePayment,
  confirmPayment,
  getPaymentStatus
};