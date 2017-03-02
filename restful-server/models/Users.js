/**
 * Created by vishal on 12/4/16.
 */
'use strict';
const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

let user = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt:{
        type: String,
        required: true
    }
});

user.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

user.methods.validPassword = function(password) {
    console.log(this.salt);
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};


user.methods.generateJwt = function() {
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiryDate.getTime() / 1000),
    }, process.env.TOKEN_SECRET);
};

mongoose.model('User', user);
