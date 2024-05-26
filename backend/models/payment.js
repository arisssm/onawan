const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const paymentSchema = new mongoose.Schema({
    reservationId: {
        type: ObjectId,
        ref: 'reservation',
        require: true
    },
    paymentMethodId: {
        type: ObjectId,
        ref: 'paymentMethod',
        require: true
    },
    deadline: {
        type: Date,
        default: Date.now,
        require: true
    },
    status: {
        type: String,
        enum: ['belum bayar','lunas','selesai']
    },
})

module.exports = mongoose.model('payment', paymentSchema);