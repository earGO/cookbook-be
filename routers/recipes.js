const express = require('express'),
    router = express.Router(),
    recipes = require('../controllers/recipes');

router.get('/', (req, res) => {
    res.send('recipes router working')
});

router.get('/all', recipes.getAll);
router.get('/:id',recipes.getOne)

module.exports = router;