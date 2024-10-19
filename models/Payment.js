// models/payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: String,
    customerId: String,
    amount: Number,
    paymentMethod: String,
    upiId: String,
    status: {
        type: String,
        default: 'Pending'
    }
});

const Payment = mongoose.model('Payment', paymentSchema);