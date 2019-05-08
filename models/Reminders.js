const mongoose = require('mongoose');

ReminderSchema = new mongoose.Schema({
    name: String,
    content:String,
    active:{
        type:Boolean,
        default:true
    },
});

module.exports = mongoose.model('reminders', ReminderSchema, 'reminders');


