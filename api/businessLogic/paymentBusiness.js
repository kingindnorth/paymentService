const paymentService = require("../serviceLogic/paymentService")

const initiatePayment = async (body) => paymentService.initiatePayment(body)
const confirmPayment = async (body) => paymentService.confirmPayment(body)
const getPaymentStatus = async (params) => paymentService.getPaymentStatus(params)

module.exports = {
    initiatePayment,
    confirmPayment,
    getPaymentStatus
  };