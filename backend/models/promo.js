const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    headline: {
        type: String,
        require: true
    },
    imageOne: {
        type: String,
        require: true
    },
    imageTwo: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('promo', promoSchema);