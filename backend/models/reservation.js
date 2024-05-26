const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const passangerSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ['Tuan', 'Nyonya', 'Nona'],
        require: true
    },
    fullname: {
        type: String,
        require: true
    },
    typeTicket: {
        type: String,
        enum: ['Dewasa', 'Anak-anak'],
        require: true
    }
});

const reservationSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        require: true
    },
    userTitle: {
        type: String,
        enum: ['Tuan', 'Nyonya', 'Nona'],
        require: true
    },
    reservationDate: {
        type: Date,
        default: Date.now,
        require: true
    },
    totalPayment: {
        type: Number,
        require: true
    },
    passengers: [passangerSchema],
    flightId: {
        type: ObjectId,
        ref: 'flightSchedule',
        require: true
    }
});

module.exports = mongoose.model('reservation', reservationSchema);