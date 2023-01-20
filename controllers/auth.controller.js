const {generateAuthTokens} = require("../services/token.service");
const passwordService = require("../services/password.service");
const OAuth = require("../dataBase/OAuth");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user;
            const {password} = req.body;
            await passwordService.comparePassword(hashPassword, password);

            const tokens = generateAuthTokens();

            await OAuth.create({
                userId: _id,
                ...tokens
            })

            res.json({...tokens})

        } catch (e) {
            next(e);
        }

    },
    logout: async (req, res, next) => {
        try {
            const {access_token} = req;

            await OAuth.deleteOne({access_token});

            res.sendStatus(204)

        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token});

            const tokens = generateAuthTokens();

            await OAuth.create({userId: userId, ...tokens});

            res.json({...tokens})

        } catch (e) {
            next(e);
        }

    }
}
