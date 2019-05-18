const mongoose = require('mongoose'),

WeekplanSchema = new mongoose.Schema({
    dayplans: [{
        dayplan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'dayplans'
        }
    }],
    weekNumber:Number
});

module.exports = mongoose.model('weekplans', WeekplanSchema, 'weekplans');


