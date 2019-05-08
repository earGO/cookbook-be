const mongoose = require('mongoose');

WeekplanSchema = new mongoose.Schema({
    dayplans: [{
        dayplan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'dayplans'
        }
    }]
});

module.exports = mongoose.model('weekplans', WeekplanSchema, 'weekplans');


