const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Alphabet Model
const Alphabet = require('../../models/Alphabet');

// @route   GET api/hiragana
// @desc    Get ALL Hiragana
// @access  Public
router.get('/config/:isHiragana.:level', (req, res) => {
    console.log(req)
    console.log(req.body)
    Alphabet.find()
        .where('isHiragana').equals(req.params.isHiragana)
        .where('level').gt(0).lte(req.params.level)
        .sort({ level: 1 })
        .then(hiragana => res.json(hiragana))
});

// @route   GET api/katagana
// @desc    Get ALL Katagana
// @access  Public
router.get('/katagana', (req, res) => {
    Alphabet.find()
        .where( isHiragana ).equals(false)
        .sort({ jpName: 1 })
        .then(katagana => res.json(katagana))
});

// @route   POST api/hiragana
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