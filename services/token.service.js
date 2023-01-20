const jwt = require('jsonwebtoken');

const CError = require("../error/CustomError");
const {ACCESS_TOKEN, REFRESH_TOKEN} = require("../constants/config");
const {ACCESS, REFRESH} = require("../enums/token.type.enum");

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
    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCESS_TOKEN, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, REFRESH_TOKEN, {expiresIn: '30m'});

        return {
            access_token,
            refresh_token
        }
    },
}
