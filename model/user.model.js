const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique:true
    },
    verified: {
        type: Boolean,
        default: false
    },
    secret: {
        type: String,
        default: null
    },
    userType: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer",
        required: true
    }


},{timestamps:true,versionKey:false});

module.exports = mongoose.model('User', userSchema);

