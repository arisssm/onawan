const mongoose = require('mongoose');

const airlaneSchema = new mongoose.model({
    name: {
        type: String,
        require: true
    },
    logo: {
        type: String,
        require: true
    },
    icon: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('airlane', airlaneSchema);