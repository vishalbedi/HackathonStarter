'use strict';
const fs = require('fs');
const express = require('express');
let router = express.Router();
const auth = require('../middleware/auth');
module.exports = function(app){
    fs.readdirSync(__dirname).forEach(function(file){
        if(file === 'index.js'){
            return;
        }
        let name = file.substr(0,file.indexOf('.'));
        console.log(name);
        require('./' + name)(router);
    });
    app.use('/v2/social-network', auth, router);
};