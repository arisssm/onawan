const mongoose = require('mongoose');

const aboutBannerSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true,
    },
    headline: {
        type: String,
        require: true,
    },
    subHeadline: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('aboutBanner', aboutBannerSchema);