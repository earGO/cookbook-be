const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

require('../models/User');

const User = mongoose.model('users');




/*IMPORTANT FUNCTIONALITY
* 1 do not forget to set 'gotPrepped' flag on an edited recipe to 'false' after edit
* 2 reset all preparation actions on an edited recipe after saving this recipe to database*/






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