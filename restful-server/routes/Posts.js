/**
 * Created by vishal on 12/8/16.
 */
'use strict';

const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const _ = require('lodash');

module.exports = function(router){
    let getPosts = (req, res, next)=>{
        if (!req.payload._id) {
            res.status(401).json({
                "message" : "UnauthorizedError"
            });
        } else {
            Post.find({email:req.payload.email})
                .exec(function(err, posts) {
                    if(err){
                        res.status(500).json({"error":err});
                        return;
                    }
                    res.status(200).json({"posts":posts});
                });
        }
    };

    let savePosts = (req, res, next)=>{
        if (!req.payload._id) {
            res.status(401).json({
                "message" : "UnauthorizedError"
            });
        } else {
            let post = new Post();
            post.email = req.body.email;
            post.name = req.body.name;
            post.content = req.body.content;

            post.save(function(err) {
                if(err){
                    res.status(500).json({"error":err});
                    return;
                }
                res.status(200);
                res.json({
                    "post" : post
                });
            });
        }
    };

    router.route('/posts')
        .get(getPosts);

    router.route('/save-posts')
        .post(savePosts);
};