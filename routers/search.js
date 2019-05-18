const express = require('express'),
    router = express.Router(),
    search = require('../controllers/search');

router.get('/areas', search.areas);
router.get('/categories', search.categories)

module.exports = router;