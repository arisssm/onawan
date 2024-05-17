const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema ({
    history: {
        type: String,
        require: true
    },
    imageHistory: {
        type: String,
        require: true
    },
    vision: {
        type: String,
        require: true
    },
    mission: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
    // bannerSupport: {
    //     type: String,
    //     require: true
    // }
});

module.exports = mongoose.model('about', aboutSchema);