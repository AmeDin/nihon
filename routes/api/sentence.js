const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const cloudinary = require('../../config/cloudinary');
const multerUploads = require('../../config/multer');
const dataUri = require('../../config/dataUri');

// Shigoto Model
const Sentence = require('../../models/Sentence');

// @route   GET api/sentence
// @desc    Get ALL Sentences
// @access  Public
router.get('/', (req, res) => {
    Sentence.find()
        .sort({ engName: 1 })
        .then(sentence => res.json(sentence))
});

// @route   POST api/sentence
// @desc    Create a sentence
// @access  Private
router.post('/', (auth, multerUploads), (req, res) => {
    const file = dataUri(req.file).content;
    console.log(req.file)
    
    cloudinary.uploader.upload(file)
        .then((result) => {
            console.log("success")
            console.log(result)
            const newSentence = new Sentence({
                engName: req.body.engName,
                jpName: req.body.jpName,
                hiragana: req.body.hiragana,
                img: result.url
            });
            newSentence.save()
        .then(sentence => res.json(sentence));
        }).catch((err) => {
            console.log("error")
            console.log(result)
        });
});

module.exports = router;