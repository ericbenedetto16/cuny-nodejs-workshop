const express = require('express'); // Module for Creating a Server in Node.js
const morgan = require('morgan'); // Module Used for Logging Requests Made to Server
require('colors'); // Add Colored Logging
require('dotenv').config(/* Path to .env if Not in Same Directory */); // Enable env Files

const app = express(); // Initialize the Server

// If the Server is in Development Mode, Log Requests
if ((process.env.NODE_ENV = 'development')) {
    app.use(morgan('dev'));
}

// Create a Route at /test that returns HTTP Status 200 and text hello world
app.get('/test', (req, res, next) => res.status(200).send('hello world'));

const PORT = process.env.PORT || 5000; // Define the Port for the Server to Listen on

// Tell the Server to Start
app.listen(5000, () => {
    console.log(`Example Server Listening on Port ${PORT}`.yellow.bold);
});
