/**
 * Created by vishal on 12/4/16.
 */
'use strict';


const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const _ = require('lodash');

module.exports = function(router){

    let register = function (req, res){
        let user = new User();
        console.log(req.body);
        if(_.isEmpty(req.body)){
            res.status(400).json({"error":"Please check Username and Password"});
            return;
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        user.save(function(err) {
            if(err){
                res.status(500).json({"error":err});
                return;
            }
            let token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        });
    };


     let login = function(req, res) {
         if(_.isEmpty(req.body)){
             res.status(400).json({"error":"Please check Username and Password"});
             return;
         }
        passport.authenticate('local', (err, user, info) => {
            let token;

            // If Passport error
            if (err) {
                res.status(404).json(err);
                return;
            }

            // user found
            if(user){
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token" : token
                });
            } else {
                // user not found
                res.status(401).json(info);
            }
        })(req, res);

    };

    router.route('/register')
        .post(register);

    router.route('/login')
        .post(login);
};