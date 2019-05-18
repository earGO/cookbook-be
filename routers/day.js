const express = require('express'),
    router = express.Router(),
    oneDay = require('../controllers/days/showOneDay');

router.get('/',oneDay.show);

module.exports = router;