const express = require('express'),
    router = express.Router(),
    showDash = require('../controllers/dashboard/showDash');

router.get('/:date',showDash.showDash)

module.exports = router;