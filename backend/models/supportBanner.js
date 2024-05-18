const mongoose = require('mongoose');

const supportBannerSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('supportBanner', supportBannerSchema);