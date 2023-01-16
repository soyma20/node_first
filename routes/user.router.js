const userRouter = require('express').Router();

const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId',userMiddleware.isIdPresented, userController.getUserById);
userRouter.post('/', userMiddleware.isNewUserValid, userMiddleware.isEmailRegistered, userController.createUser);
userRouter.put('/:userId', userMiddleware.isIdPresented, userMiddleware.isUpdateUserValid,  userController.updateUserById);
userRouter.delete('/:userId', userMiddleware.isIdPresented, userController.deleteUserById);


module.exports = userRouter;
