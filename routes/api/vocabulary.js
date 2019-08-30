const express = require('express');
const auth = require('../../middleware/auth');
const cloudinary = require('../../config/cloudinary');
const multerUploads = require('../../config/multer');
const dataUri = require('../../config/dataUri');

const router = express.Router();

// Vocabulary Model
const Vocabulary = require('../../models/Vocabulary');

// @route   GET api/vocabulary
// @desc    Get ALL vocabulary
// @access  Public
router.get('/', (req, res) => {
    Vocabulary.find()
        .sort({ engName: 1 })
        .then(vocabulary => res.json(vocabulary))
});

// @route   POST api/vocabulary
// @desc    Create a vocabulary
// @access  Private
router.post('/', (auth, multerUploads), (req, res) => {
    console.log(req.body);
    const file = dataUri(req.file).content;
    
    cloudinary.uploader.upload(file)
        .then((result) => {
            console.log("success")
            console.log(result)
            const newVocabulary = new Vocabulary({
                engName: req.body.engName,
                jpName: req.body.jpName,
                hiragana: req.body.hiragana,
                kanji: req.body.kanji,
                img: result.url,
                category: req.body.category
            });
            newVocabulary.save()
                .then(vocabulary => res.json(vocabulary));
        }).catch((err) => {
            console.log("error")
            console.log(result)
        });
    
    
});

// @route   POST api/vocabulary/:id
// @desc    Delete a vocabulary
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Vocabulary.findById(req.params.id)
        .then(vocabulary => vocabulary.remove()
                .then((y) => res.json({success: true})
                )
            )
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;