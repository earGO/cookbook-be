const mongoose = require('mongoose');

DayPlanSchema = new mongoose.Schema({
    reminders: [{
        reminder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reminders'
        }
    }],
    meals: [{
        reminder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recipes'
        }
    }],
    todos: [{
        reminder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'todos'
        }
    }],
});

module.exports = mongoose.model('dayplans', DayPlanSchema, 'dayplans');


