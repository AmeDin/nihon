const express = require('express');
const router = express.Router();
const dropbox = require('../../config/dropbox');

// @route   GET api/dropbox/img
// @desc    Get temp image from dropbox
// @access  Public
router.get('/img', (req, res) => {
    dropbox({
        resource: 'files/get_temporary_link',
        parameters: {
            path: '/' + req.body.category + '/' + req.body.img
        }
    }, (err, result) => {
        console.log(err)
        console.log(result)
        res.json(result)
    });
});

module.exports = router;