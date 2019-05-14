const mongoose = require('mongoose'),

ActualDaySchema = new mongoose.Schema({
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
    todos:[
        {
            todo:String,
            active:Boolean

        }
    ],
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

module.exports = mongoose.model('actualDays', ActualDaySchema, 'actualDays');


