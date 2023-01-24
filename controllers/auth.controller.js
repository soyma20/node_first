const {generateAuthTokens} = require("../services/token.service");
const passwordService = require("../services/password.service");
const oauthService = require("../services/oauth.service");
const emailService = require("../services/email.service");
const emailAction = require("../enums/email.action.enum");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user;
            const {password} = req.body;
            await passwordService.comparePassword(hashPassword, password);

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
            const {email,_id, name} = req.user;

            await emailService.sendMail(email, emailAction.FORGOT_PASSWORD, {name});

            res.sendStatus(202);
        } catch (e) {
            next(e)
        }
    }
}
