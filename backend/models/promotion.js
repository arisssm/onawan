const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('promotion', promotionSchema);