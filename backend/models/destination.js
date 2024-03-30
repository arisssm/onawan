const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    isRecommendation: {
        type: Boolean,
        default: false
    },
    idnRecommendation: {
        type: Boolean,
        default: false
    },
    interRecommendation: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('destination', destinationSchema);