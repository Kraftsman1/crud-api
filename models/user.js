// Implement mongoose User Model
const mongoose = require('mongoose')

const model = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin', 'client']
    },
    accessToken: {
        type: String
    }
});

module.exports = new mongoose.model("User", model)