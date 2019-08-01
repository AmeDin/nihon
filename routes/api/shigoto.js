const express = require('express');
const router = express.Router();
//const auth = require('../../middleware/auth');

// Shigoto Model
const Shigoto = require('../../models/Shigoto');

// @route   GET api/items
// @desc    Get ALL Items
// @access  Public
router.get('/', (req, res) => {
    Shigoto.find()
        .sort({ engName: 1 })
        .then(shigoto => res.json(shigoto))
});

// @route   POST api/items
// @desc    Create a item
// @access  Private
router.post('/', (req, res) => {
    console.log(req.body);
    const newShigoto = new Shigoto({
        engName: req.body.engName,
        jpName: req.body.jpName,
        img: req.body.img
    });

    newShigoto.save()
        .then(shigoto => res.json(shigoto));
});

// @route   POST api/items/:id
// @desc    Delete a Item
// @access  Private
router.delete('/:id', (req, res) => {
    Shigoto.findById(req.params.id)
        .then(shigoto => shigoto.remove()
                .then((y) => res.json({success: true})
                )
            )
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;