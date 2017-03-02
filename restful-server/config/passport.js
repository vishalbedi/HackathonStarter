/**
 * Created by vishal on 12/4/16.
 */
'use strict';
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let User = mongoose.model('User');

/**
 * Callback to execute local strategy for auth
 * @param username
 * @param password
 * @param next Callback function when local strategy execution is completed
 */


let localStrategyCallback =  (username, password, next)  => {

    User.findOne({ email: username }, function (err, user) {
        if (err) { return next(err); }
        // Return if user not found in database
        if (!user) {
            return next(null, false, {
                message: 'User not found'
            });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
            return next(null, false, {
                message: 'Password is wrong'
            });
        }
        // If credentials are correct, return the user object
        return next(null, user);
    });
};

passport.use(new LocalStrategy({usernameField: 'email'}, localStrategyCallback));
