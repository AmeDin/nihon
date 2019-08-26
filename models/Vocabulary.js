const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VocabularySchema = new Schema({
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
    kanji: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = Vocabulary = mongoose.model('vocabulary', VocabularySchema);