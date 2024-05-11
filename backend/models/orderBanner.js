const mongoose = require('mongoose');

const orderBannerSchema = new mongoose.Schema({
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

module.exports = mongoose.model('orderBanner', orderBannerSchema);