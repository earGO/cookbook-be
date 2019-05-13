const express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
        auth = require('../controllers/auth');

router.get('/', auth.login);

module.exports = router;