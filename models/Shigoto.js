const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ShigotoSchema = new Schema({
    engName: {
        type: String,
        required: true
    },
    jpName: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

module.exports = Shigoto = mongoose.model('shigoto', ShigotoSchema);