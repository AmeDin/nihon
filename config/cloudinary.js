const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'sdmpatchy',
    api_key: '388171257111375',
    api_secret: '2dWZN6Hi6u-lIi1aAhyCWXj9Ck4'
});

module.exports = cloudinary;