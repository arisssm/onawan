const mongoose = require('mongoose');
const Airport = require('./airport');
const { ObjectId } = mongoose.Schema;4

const flightSchema = new mongoose.Schema({
    airlineName: {
        type: String,
        require: true
    },
    icon: {
        type: String,
        require: true
    },
    departureTime: {
        type: Date,
        require: true
    },
    arrivalTime: {
        type: Date,
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    flightClass: {
        type: String,
        require: true
    },
    capacity: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    flightNumber: {
        type: String,
        require: true
    },
    flightType: {
        type: String,
        require: true
    },
    airportId: [{
        type: ObjectId,
        ref: Airport
    }]
})

module.exports = mongoose.model('flight', flightSchema);