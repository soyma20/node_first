const authRouter = require('express').Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

authRouter.post('/login',
    authMiddleware.isLoginBodyValid,
    authMiddleware.checkIsUserPresent,
    authController.login);
authRouter.post('/refreshToken',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);
authRouter.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

module.exports = authRouter;
