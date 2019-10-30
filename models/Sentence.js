const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SentenceSchema = new Schema({
    engName: {
        type: String,
        required: true
    },
    jpName: {
        type: String,
        required: true
    },
    hiragana: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

module.exports = Sentence = mongoose.model('sentence', SentenceSchema);