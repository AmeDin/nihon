const path = require('path')
const Datauri = require('datauri');
const dUri = new Datauri();
const dataUri = file => dUri.format(path.extname(file.originalname).toString(), file.buffer);
module.exports = dataUri;