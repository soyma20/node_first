const {model, Schema} = require('mongoose')

const {USER_REF, ACTION_TOKEN_REF} = require('../constants/constant');
const emailActions = require('../enums/email.action.enum');

const ActionTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: USER_REF,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    actionType: {
        type: String,
        enum: Object.values(emailActions),
        required: true,
    },

}, {timestamps: true})

module.exports = model(ACTION_TOKEN_REF, ActionTokenSchema)
