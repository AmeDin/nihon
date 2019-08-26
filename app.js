const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const config = require('config')
const jwt = require('jsonwebtoken')

// Full Documentation - https://www.turbo360.co/docs
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})

const app = vertex.express() // initialize app

/* */
const db = config.get('mongoUri');

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
app.use('/api/vocabulary', require('./routes/api/vocabulary'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('nihongo/build'));

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'nihongo', 'build', 'index.html'));
    });
}


/*  
	Apps can also be initialized with config options as shown in the commented out example below. Options
	include setting views directory, static assets directory, and database settings. To see default config
	settings, view here: https://www.turbo360.co/docs 

const config = {
	views: 'views', 		// Set views directory 
	static: 'public', 		// Set static assets directory
	db: { 					// Database configuration. Remember to set env variables in .env file: MONGODB_URI, PROD_MONGODB_URI
		url: (process.env.TURBO_ENV == 'dev') ? process.env.MONGODB_URI : process.env.PROD_MONGODB_URI,
		type: 'mongo',
		onError: (err) => {
			console.log('DB Connection Failed!')
		},
		onSuccess: () => {
			console.log('DB Successfully Connected!')
		}
	}
}

const app = vertex.app(config) // initialize app with config options

*/


// import routes
const index = require('./routes/index')
const api = require('./routes/api')

// set routes
app.use('/', index)
app.use('/api', api) // sample API Routes


module.exports = app