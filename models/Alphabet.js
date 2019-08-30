const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AlphabetSchema = new Schema({
    jpName: {
        type: String,
        required: true
    },
    isHiragana: {
        type: Boolean,
        default: true,
        required: true
    },
    character: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});

module.exports = Shigoto = mongoose.model('alphabet', AlphabetSchema);