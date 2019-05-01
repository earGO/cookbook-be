const mongoose = require('mongoose'),

    AreaSchema = new mongoose.Schema({
        name: String,
    });

module.exports = mongoose.model('areas', AreaSchema, 'areas');

