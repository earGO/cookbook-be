const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
        facebookID:{
            type:String,
            required:true
        },
        firstName:String,
        email:{
            type:String,
            required:true
        },
        lastName:String,
        image:String

    })

module.exports = mongoose.model('Users',UserSchema)
