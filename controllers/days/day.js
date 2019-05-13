const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

require('../models/User');

const User = mongoose.model('users');


//contorollers functions
const login = function (req, res) {
    res.render('users/login')
}


//helper functions on authenticate
const ensureAuthenticated = function (req, res, next) {
}

module.exports = {
    login,
    ensureAuthenticated
}