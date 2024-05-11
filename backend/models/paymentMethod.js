const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    logo: {
        type: String,
        require: true
    },
    accountNumber: {
        type: Number,
        require: true
    },
    accountHolder: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('paymentMethod', paymentMethodSchema);