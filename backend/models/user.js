const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    fullName: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    username:  {
        type: String,
        require: true   
    },
    role: {
        type: String,
        enum: ['customer','admin']
    },
    isPassenger: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('user', userSchema);