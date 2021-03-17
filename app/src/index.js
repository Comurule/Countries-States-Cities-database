require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// Set up the express app
const app = express();
const port = process.env.PORT || 8082;

//Enable cors
const corsOptions = {
    'allowedHeaders': [
        'sessionId',
        'Content-Type',
        'X-Requested-With',
        'Accept',
        'Authorization',
        'X-Access-Token'
    ],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 200,
}
app.use(cors(corsOptions));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Application Routes
app.use(require('./routes'));

app.listen(port, () => { console.log(`Listening on PORT: ${port}`); });