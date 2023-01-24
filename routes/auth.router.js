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
authRouter.post('/logoutAllDevices',
    authMiddleware.checkAccessToken,
    authController.logoutFromAllDevices);
authRouter.post('/forgot/password',
    authMiddleware.isEmailValid,
    authMiddleware.checkIsUserPresent,
    authController.forgotPassword);

module.exports = authRouter;
