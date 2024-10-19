const Payment = require('../../models/Payment')

// Initiate payment
const initiatePayment = async (body) => {
    const { orderId, customerId, amount, paymentMethod } = body;

    // UPI ID simulation based on payment method
    const upiId = paymentMethod === 'PhonePe' ? '9999888877@upi' : '8888777766@upi';

    const newPayment = new Payment({
        orderId,
        customerId,
        amount,
        paymentMethod,
        upiId,
        status: 'Pending'
    });

    await newPayment.save();

    return {
        message: 'Payment initiated',
        paymentId: newPayment._id,
        upiId: newPayment.upiId,
        amount: newPayment.amount
    };
};

// Confirm payment
const confirmPayment = async (body) => {
    const { paymentId } = body;

    let payment = await Payment.findById(paymentId);
    if (!payment) {
        return {status:404, message: 'Payment not found'};
    }

    // Simulate payment confirmation
    payment.status = 'Success';
    await payment.save();

    // Notify the Order Service to confirm the order
    try {
        await axios.post('http://localhost:3002/orders/' + payment.orderId + '/confirm');
    } catch (error) {
        return {status:500, message: 'Failed to confirm order with Order Service', error: error.message };
    }

    return {
        message: 'Payment confirmed and order updated',
        payment
    };
};

// Get payment status
const getPaymentStatus = async (params) => {
    const { paymentId } = params;
    const payment = await Payment.findById(paymentId);

    if (!payment) {
        return {status:404, message: 'Payment not found'};
    }

    return {
        paymentId: payment._id,
        status: payment.status,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        upiId: payment.upiId
    };
};

module.exports = {
    initiatePayment,
    confirmPayment,
    getPaymentStatus
};
