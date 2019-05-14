const mongoose = require('mongoose'),

ActualDaySchema = new mongoose.Schema({
    dayplanID:String,
    reminders: [{
        active:Boolean,
        content:String
    }],
    meals: [{
        recipeID:String,
        recipeName:String,
        recipeImage:String,
        recipeCooked:Boolean,
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


