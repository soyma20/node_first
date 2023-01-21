const {generateAuthTokens} = require("../services/token.service");
const passwordService = require("../services/password.service");
const oauthService = require("../services/oauth.service");

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
            const {access_token} = req;

            await oauthService.deleteOneOauth({access_token});

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

    }
}
