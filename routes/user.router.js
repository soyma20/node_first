const userRouter = require('express').Router();

const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

userRouter.get('/',
    userController.getAllUsers);
userRouter.get('/:userId',
    userMiddleware.isIdPresented,
    userController.getUserById);
userRouter.post('/',
    userMiddleware.isNewUserValid,
    userMiddleware.isEmailRegistered,
    userController.createUser);
userRouter.put('/:userId',
    // userMiddleware.isIdPresented,
    authMiddleware.checkAccessToken,
    userMiddleware.isUpdateUserValid,
    userController.updateUserById);
userRouter.delete('/:userId',
    userMiddleware.isIdPresented,
    authMiddleware.checkAccessToken,
    userController.deleteUserById);


module.exports = userRouter;
