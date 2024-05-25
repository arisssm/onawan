const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const flightScheduleSchema = new mongoose.Schema({
    airlineId: {
        type: ObjectId,
        ref: 'airline',
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
    departureAirportId: {
        type: ObjectId,
        ref: 'airportList',
        required: true
    },
    arrivalAirportId: {
        type: ObjectId,
        ref: 'airportList',
        required: true
    }
});

module.exports = mongoose.model('flightSchedule', flightScheduleSchema);