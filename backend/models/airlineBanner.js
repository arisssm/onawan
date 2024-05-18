const mongoose = require('mongoose');

const arilineBannerSchema = new mongoose.Schema({
    headline: {
        type: String,
        require: true,
    },
    subHeadline: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('arilineBanner', arilineBannerSchema);