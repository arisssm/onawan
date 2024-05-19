const mongoose = require('mongoose');
const airportListSchema = new mongoose.Schema({
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
        enum: ['departure','arrival']   
    }
})

module.exports = mongoose.model('AirportList', airportListSchema);