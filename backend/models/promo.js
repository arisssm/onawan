const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
    headline: {
        type: String,
        require: true
    },
    image: [{
        type: String,
        require: true
    }]
})

module.exports = mongoose.model('promo', promoSchema);