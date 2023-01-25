const authRouter = require('express').Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {FORGOT_PASSWORD} = require("../enums/email.action.enum");

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
authRouter.post('/logoutAllDevices',
    authMiddleware.checkAccessToken,
    authController.logoutFromAllDevices);
authRouter.post('/password/forgot',
    authMiddleware.isEmailValid,
    authMiddleware.checkIsUserPresent,
    authController.forgotPassword);
authRouter.post('/password/forgot/set',
    authMiddleware.isPasswordValid,
    authMiddleware.checkActionToken(FORGOT_PASSWORD),
    authController.setForgotPassword);

module.exports = authRouter;
