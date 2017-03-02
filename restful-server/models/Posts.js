/**
 * Created by vishal on 12/4/16.
 */
'use strict';
const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

let post = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    content: {
        type: String
    },
    timestamp: {
        type: Date
    }
});

mongoose.model('Post', post);
