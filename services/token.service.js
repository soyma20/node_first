const jwt = require('jsonwebtoken');

const CError = require("../error/CustomError");
const {
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    FORGOT_PASSWORD_ACTION_TOKEN,
    ACTION_TOKEN_EXPIRES_IN,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN
} = require("../constants/config");
const {ACCESS, REFRESH} = require("../enums/token.type.enum");
const {FORGOT_PASSWORD} = require("../enums/email.action.enum");

module.exports = {
    checkToken: (token = '', typeOfToken = ACCESS) => {
        try {
            let secret;

            if (typeOfToken === ACCESS) secret = ACCESS_TOKEN;
            if (typeOfToken === REFRESH) secret = REFRESH_TOKEN;

            return jwt.verify(token, secret)
        } catch (e) {
            throw new CError("Token is not valid", 401)
        }
    },
    checkActionToken: (token, actionType ) => {
        try {
            let secret = '';

            if (actionType === FORGOT_PASSWORD) {
                secret = FORGOT_PASSWORD_ACTION_TOKEN
            } else {
                throw new CError("Wrong action type", 500)
            }
            return jwt.verify(token, secret)
        } catch (e) {
            throw new CError("Token is not valid", 401)
        }
    },
    generateActionToken: (actionType, payload = {}) => {
        let secretWord = '';
        let expiresIn = ACTION_TOKEN_EXPIRES_IN;

        if (actionType === FORGOT_PASSWORD) {
            secretWord = FORGOT_PASSWORD_ACTION_TOKEN
        } else {
            throw new CError("Wrong action type", 500)
        }
        console.log(secretWord)
        return jwt.sign(payload, secretWord, {expiresIn});
    },

    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCESS_TOKEN, {expiresIn: ACCESS_TOKEN_EXPIRES_IN});
        const refresh_token = jwt.sign(payload, REFRESH_TOKEN, {expiresIn: REFRESH_TOKEN_EXPIRES_IN});

        return {
            access_token,
            refresh_token
        }
    },
}
