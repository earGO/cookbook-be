const mongoose = require('mongoose'),

    CategorySchema = new mongoose.Schema({
        name: String,
    });

module.exports = mongoose.model('categories', CategorySchema, 'categories');

