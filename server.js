const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
//const config = require('config')

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
//const db = config.get('mongoUri');
const db = "mongodb+srv://root:mikubeforu@mern-nklc2.mongodb.net/test?retryWrites=true";

// Connect to Mongo
mongoose
    .connect(db, {
         useNewUrlParser: true,
         useCreateIndex: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// Use Routes
app.use('/api/shigoto', require('./routes/api/shigoto'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));