const {schema, model, Schema} = require('mongoose')

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

module.exports = model('user', UserSchema)
