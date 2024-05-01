const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const airportSchema = new mongoose.Schema({
    city: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    airport: {
        type: String,
        require: true
    },
    category:  {
        type: String,
        enum: ['departure','arrival'],   
    },
    flightId: {
        type: ObjectId,
        ref: 'Flight'
    }
})

module.exports = mongoose.model('airport', airportSchema);