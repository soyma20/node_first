const {model, Schema} = require('mongoose')

const {USER_REF} = require('../constants/constant');
const {hashPassword, comparePassword} = require("../services/password.service");

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
    },
    phone: {
        type: String,
        required: true
    }

}, {timestamps: true})

UserSchema.methods = {
    comparePasswords: async function (password){
        await comparePassword(this.password, password)
    }
}
UserSchema.statics = {
    createWithHashPassword: async function (userToSave){
        const hashedPassword = await hashPassword(userToSave.password);

        return await this.create({...userToSave, password:hashedPassword});
    }
}

module.exports = model(USER_REF, UserSchema)
