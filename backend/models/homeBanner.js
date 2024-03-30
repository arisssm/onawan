const mongoose = require('mongoose');

const homeBannerSchema = new mongoose.Schema({
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

module.exports = mongoose.model('homeBanner', homeBannerSchema);