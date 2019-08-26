const dropboxV2Api = require('dropbox-v2-api');

//create session
const dropbox = dropboxV2Api.authenticate({
    token: 'Yuq5lH4TzrgAAAAAAAAB46HJFdAIFGj4WRAg62GwR_JOHs-mzJjiv0kKyauw_j5i'
});


module.exports = dropbox;