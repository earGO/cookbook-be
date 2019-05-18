const mongoose = require('mongoose'),

DayPlanSchema = new mongoose.Schema({
    reminders: [String],
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
    todosY: [String],
    /*theese are todos for the morning from all evening recipes*/
    todosM: [String],
    date:Date,
    groceryDay:{
        type:Boolean,
        default:false
    },
    groceries:[{
        name:String,
        amount:String,
        measurement:String
    }]
});

module.exports = mongoose.model('dayplans', DayPlanSchema, 'dayplans');


