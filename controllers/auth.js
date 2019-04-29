const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

require('../models/User-local');

const User = mongoose.model('usersLocals');


//contorollers functions
const login = function (req, res,next) {
    User.findOne({name:'Barney'},(err,user)=>{
        if(err){
            console.log('error fetching user\n',err)
        } else {
            console.log('found user Barney');
            res.send(user);
        }
    })
}


//helper functions on authenticate
const ensureAuthenticated = function (req, res, next) {
}

module.exports = {
    login,
    ensureAuthenticated
}