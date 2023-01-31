const userRouter = require('express').Router();

const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const fileMiddleware = require("../middlewares/file.middleware");
const commonMiddleware = require("../middlewares/common.middleware");

userRouter.get('/',
    userController.getAllUsers);

userRouter.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isIdPresented,
    userController.getUserById);

userRouter.post('/',
    userMiddleware.isNewUserValid,
    fileMiddleware.checkPhoto,
    userMiddleware.isEmailRegistered,
    userController.createUser);

userRouter.put('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUpdateUserValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isIdPresented,
    userController.updateUserById);

userRouter.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isIdPresented,
    userController.deleteUserById);


module.exports = userRouter;
