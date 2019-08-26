const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const cloudinary = require('../../config/cloudinary');
const multerUploads = require('../../config/multer');
const dataUri = require('../../config/dataUri');

// Shigoto Model
const Shigoto = require('../../models/Shigoto');

// @route   GET api/shigoto
// @desc    Get ALL Shigoto
// @access  Public
router.get('/', (req, res) => {
    Shigoto.find()
        .sort({ engName: 1 })
        .then(shigoto => res.json(shigoto))
});

// @route   POST api/shigoto
// @desc    Create a Shigoto
// @access  Private
router.post('/', (auth, multerUploads), (req, res) => {
    const file = dataUri(req.file).content;
    
    cloudinary.uploader.upload(file)
        .then((result) => {
            console.log("success")
            console.log(result)
            const newShigoto = new Shigoto({
                engName: req.body.engName,
                jpName: req.body.jpName,
                hiragana: req.body.hiragana,
                img: result.url
            });
            newShigoto.save()
        .then(shigoto => res.json(shigoto));
        }).catch((err) => {
            console.log("error")
            console.log(result)
        });
});

// @route   POST api/shigoto/:id
// @desc    Delete a Shigoto
// @access  Private
router.delete('/:id', (auth,multerUploads), (req, res) => {
    Shigoto.findById(req.params.id)
        .then(shigoto => shigoto.remove()
                .then((y) => res.json({success: true})
                )
            )
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;