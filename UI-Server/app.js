'use strict';
const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
let serverIdGenerator = require('./util/hash');
let atob = require('atob');
dotenv.load({ path: '.env' });

const proxy = require('express-http-proxy');



let app = express();


app.use(logger(process.env.APPLICATION_MODE));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public/app", {index:'index.html'}));
app.use('/ping', function (req, res) {
    let reply = {"data": "pong"};
    res.json(reply);
});

app.use('/api', proxy('localhost:5858', {
    filter : function (req, res) {
        let email = req.body.email;
        let token = req.headers.authorization;
        let user = {};
        if(token){
            token = token.split(' ')[1];
            token = token.split('.')[1];
            user = atob(token);
            user = JSON.parse(user);
        }
        let finalEmail = email ? email : user.email;
        return serverIdGenerator(finalEmail, 1) == 0;
    }
}));
module.exports = app;
