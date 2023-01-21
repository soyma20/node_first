const CError = require("../error/CustomError");
const User = require("../dataBase/User");
const {hashPassword} = require("../services/password.service");
const userService = require("../services/user.service");

async function getAllUsers(req, res, next) {
    try {
        const users = await userService.findUsers()
        res.json(users)
    } catch (e) {
        next(e);
    }
}

async function getUserById(req, res, next) {
    try {
        const {user} = req;
        res.json(user);
    } catch (e) {
        next(e);
    }

}

async function createUser(req, res, next) {
    try {
        const hashedPassword = await hashPassword(req.body.password);
        const user = await userService.createUser({...req.body, password: hashedPassword});
        res.status(201).json(user)
    } catch (e) {
        next(e);
    }
}

async function deleteUserById(req, res, next) {
    try {
        const {id} = req.params;
        await userService.deleteUser(id)
        res.status(204).json('User was deleted')
    } catch (e) {
        next(e);
    }
}

async function updateUserById(req, res, next) {
    try {
        const {id} = req.params;
        const updatedUser = await userService.updateUser(id, req.body);
        res.status(201).json(updatedUser)
    } catch (e) {
        next(e);
    }
}


module.exports = {
    createUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    updateUserById,
}
