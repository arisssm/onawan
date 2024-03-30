const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true
    },
    fullname: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('testimonial', testimonialSchema);