'use strict';
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.load({ path: '.env' });

require('./models/db');
require('./config/passport');

let app = express();


app.use(logger(process.env.APPLICATION_MODE));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(express.static(__dirname + "/public/app",{index:'index.html'}));
app.use('/ping', function (req, res) {
    let reply = {"data": "pong"};
    res.json(reply);
});
app.use(passport.initialize());


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});
require('./routes')(app); // pass our application into our routes

module.exports = app;
