const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Alphabet Model
const Alphabet = require('../../models/Alphabet');

// @route   GET api/config
// @desc    Get alphabet (Hiragana/Katakana)
// @access  Public
router.get('/config/:isHiragana.:level', (req, res) => {
    Alphabet.find()
        .where('isHiragana').equals(req.params.isHiragana)
        .where('level').gt(0).lte(req.params.level)
        .sort({ level: 1 })
        .then(hiragana => res.json(hiragana))
});



// @route   GET api/all
// @desc    Get alphabet (Hiragana/Katakana)
// @access  Public
router.get('/all/:level', (req, res) => {
    
    Alphabet.find()
    .where('level').gt(0).lte(req.params.level)
    .sort({ level: 1 })
    .then(alphabet => res.json(alphabet))
});

// @route   POST api/
// @desc    Create a Alphabet
// @access  Private
router.post('/', auth, (req, res) => {
    
    const newAlphabet = new Alphabet({
        jpName: req.body.jpName,
        isHiragana: req.body.isHiragana,
        character: req.body.character,
        level: req.body.level
    });
    newAlphabet.save().then(alphabet => res.json(alphabet));
});

module.exports = router;