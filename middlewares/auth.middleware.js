const CError = require("../error/CustomError");
const {checkToken, checkActionToken} = require("../services/token.service");
const userService = require("../services/user.service");
const oauthService = require("../services/oauth.service");
const actionTokenService = require("../services/actionToken.service");
const authValidator = require("../validators/auth.validator");
const {ACCESS, REFRESH} = require("../enums/token.type.enum");
const {AUTHORIZATION} = require("../constants/constant");

module.exports = {
    checkIsUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email});

            if (!user) {
                return next(new CError("Wrong email or password", 401))
            }
            req.user = user;
            next()
        } catch (e) {
            next(e)
        }
    },
    isLoginBodyValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.login.validate(req.body);

            if (error) {
                return next(new CError('Wrong email or password', 401));
            }
            req.body = value;
            next();
        } catch (e) {
            next(e)
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                return next(new CError('No token', 401))
            }

            checkToken(access_token, ACCESS);

            const tokenInfo = await oauthService.findOneOauth({access_token}).populate('userId');

            if (!tokenInfo) {
                return next(new CError('Token is not valid', 401));
            }
            req.access_token = tokenInfo.access_token;
            req.user = tokenInfo.userId;
            next()
        } catch (e) {
            next(e)
        }
    },
    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);
            if (!token) {
                return next(new CError('No token', 401))
            }
            checkActionToken(token, actionType);

            const tokenInfo = await actionTokenService.findOneActionToken({token}).populate('userId');

            if (!tokenInfo) {
                return next(new CError('Token is not valid', 401));
            }

            req.token = tokenInfo.token;
            req.user = tokenInfo.userId;
            next()
        } catch (e) {
            next(e)
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                return next(new CError('No token', 401));
            }

            checkToken(refresh_token, REFRESH);

            const tokenInfo = await oauthService.findOneOauth({refresh_token});

            if (!tokenInfo) {
                return next(new CError('Token is not valid', 401))
            }
            req.tokenInfo = tokenInfo;

            next()
        } catch (e) {
            next(e)
        }
    },
    isEmailValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.forgotPassword.validate(req.body);

            if (error) {
                return next(new CError('Wrong email', 401));
            }
            req.body = value;
            next();
        } catch (e) {
            next(e)
        }
    },
    isPasswordValid: (req, res, next) => {
        try {
            const {error, value} = authValidator.setForgotPassword.validate(req.body);

            if (error) {
                return next(new CError('Not valid', 400));
            }
            req.body = value;
            next();
        } catch (e) {
            next(e)
        }
    },
}
