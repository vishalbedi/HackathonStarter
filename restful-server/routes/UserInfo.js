/**
 * Created by vishal on 12/8/16.
 */
'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const _ = require('lodash');

module.exports = function(router){
    let getProfile = (req, res, next)=>{
        if (!req.payload._id) {
            res.status(401).json({
                "message" : "UnauthorizedError"
            });
        } else {
            User.findById(req.payload._id)
                .exec(function(err, user) {
                    res.status(200).json(user);
                });
        }
    };

    router.route('/profile')
        .post(getProfile)
};