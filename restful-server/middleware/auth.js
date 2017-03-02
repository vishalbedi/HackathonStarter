/**
 * Created by vishal on 12/8/16.
 */
'use strict';

const jwt = require('express-jwt');
module.exports =  jwt({
    secret: process.env.TOKEN_SECRET,
    userProperty: 'payload'
}).unless({path: ['/ping','/v2/social-network/login','/v2/social-network/register']});