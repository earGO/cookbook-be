const mongoose = require('mongoose'),

    UserSchema = new mongoose.Schema({
        name:String,
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        lastName:String,
        image:String,

    })

module.exports = mongoose.model('usersLocals',UserSchema)

