const {generateAuthTokens, generateActionToken} = require("../services/token.service");
const oauthService = require("../services/oauth.service");
const actionTokenService = require("../services/actionToken.service");
const emailService = require("../services/email.service");
const userService = require("../services/user.service");
const emailAction = require("../enums/email.action.enum");
const {FORGOT_PASSWORD} = require("../enums/email.action.enum");
const {hashPassword} = require("../services/password.service");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {_id} = req.user;
            const {password} = req.body;

            await req.user.comparePasswords(password)

            const tokens = generateAuthTokens();

            await oauthService.createOauth({
                userId: _id,
                ...tokens
            });

            res.json({...tokens});
        } catch (e) {
            next(e);
        }

    },
    logout: async (req, res, next) => {
        try {
            const {email, name, _id} = req.user;

            await oauthService.deleteOneOauth({userId: _id});

            await emailService.sendMail(email, emailAction.LOGOUT, {name, count: 1})

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
    logoutFromAllDevices: async (req, res, next) => {
        try {

            const {email, name, _id} = req.user;

            const {deletedCount} = await oauthService.deleteManyOauth({userId: _id});

            await emailService.sendMail(email, emailAction.LOGOUT, {name, count: deletedCount})

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await oauthService.deleteOneOauth({refresh_token});

            const tokens = generateAuthTokens();

            await oauthService.createOauth({userId, ...tokens});

            res.json({...tokens});
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const {email, _id, name} = req.user;

            const token = generateActionToken(FORGOT_PASSWORD, {email, name});
            await actionTokenService.createActionToken({
                userId: _id,
                token,
                actionType: FORGOT_PASSWORD
            })

            await emailService.sendMail(email, emailAction.FORGOT_PASSWORD, {name, token});

            res.sendStatus(202);
        } catch (e) {
            next(e)
        }
    },
    setForgotPassword: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {_id} = req.user;
            const token = req.token;

            const hashedPassword = await hashPassword(password);
            const updatedUser = await userService.updateUser({_id}, {password: hashedPassword});
            await actionTokenService.deleteOneActionToken({token, userId: _id})

            res.json(updatedUser)
        } catch (e) {
            next(e)

        }
    }
}
