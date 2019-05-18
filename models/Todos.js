const mongoose = require('mongoose'),

TodosSchema = new mongoose.Schema({
    title: String,
    content: String,
    active:{
        type:Boolean,
        default:true
    },
});

module.exports = mongoose.model('todos', TodosSchema, 'todos');


