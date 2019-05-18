const mongoose = require('mongoose'),

    RecipeSchema = new mongoose.Schema({
        mealName: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        video: {
            type: String,
            required: true
        },
        prepSteps: [{
            step:{
                type: String,
            },
            yesterday:{
                type: Boolean,
                default: false
            },
        }],
        steps: [{
            step:{
                type: String,
                required: true
            }
        }],
        ingredients: [{
            name:{
                type: String,
                required: true
            },
            measure:{
                type: String,
                required: true
            },
        }],
        author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            },
        examined: {
            type: Boolean,
            default: false
        },

    })

module.exports = mongoose.model('recipes', RecipeSchema, 'recipes')

