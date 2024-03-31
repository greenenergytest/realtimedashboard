const mongoose = require('mongoose')

const UserRegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    confirmPassword:{
        type: String,
        required:true
    },
    date:{
        type:String,
       
    }
});

module.exports = User = mongoose.model("users",UserRegistrationSchema)