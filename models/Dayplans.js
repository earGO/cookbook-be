const mongoose = require('mongoose'),

DayPlanSchema = new mongoose.Schema({
    reminders: [{
        reminder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reminders'
        }
    }],
    meals: [{
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recipes'
        },
        cooked:{
            type:Boolean,
            default:false
        },
    }],
    /*theese are todos for YESTERDAY from all recipes, needed preparation the day, prior to this one*/
    todosY: [{
        todo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'todos',
            default:[]
        }
    }],
    /*theese are todos for the morning from all evening recipes*/
    todosM: [{
        todo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'todos',
            default:[]
        }
    }],
    date:Date,
    groceryDay:{
        type:Boolean,
        default:false
    },
});

module.exports = mongoose.model('dayplans', DayPlanSchema, 'dayplans');


