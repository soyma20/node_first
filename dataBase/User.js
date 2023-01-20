const { model, Schema} = require('mongoose')

const {USER_REF} = require('../constants/constant');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    }

}, {timestamps:true})

module.exports = model(USER_REF, UserSchema)
