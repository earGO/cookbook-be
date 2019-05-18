const mongoose = require('mongoose');

require('../../models/Dayplans');

const Dayplan = mongoose.model('dayplans');


//contorollers functions
const show = function (req, res) {
    res.send('working from a days controllers with showOne controller')
};

module.exports = {
    show
}