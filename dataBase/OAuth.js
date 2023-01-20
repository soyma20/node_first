const {model, Schema} = require('mongoose')

const {USER_REF, OAUTH_REF} = require('../constants/constant');

const OAuthSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: USER_REF,
        required: true,
    },
    access_token: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
        required: true,
    },

}, {timestamps: true})

module.exports = model(OAUTH_REF, OAuthSchema)
