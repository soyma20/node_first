const userService = require("../services/user.service");
const emailService = require("../services/email.service");
const emailAction = require('../enums/email.action.enum');
const smsService = require("../services/sms.service");
const {smsTemplateBuilder} = require("../common");
const smsAction = require("../enums/sms.action.enum");
const {userPresenter} = require('../presenters/user.presenter');
const {uploadFile} = require("../services/s3.service");
const {USER_REF} = require('../constants/constant');

async function getAllUsers(req, res, next) {
    try {
        const users = await userService.findUsers().exec()

        const usersForResponse = users.map(u => userPresenter(u));

        res.json(usersForResponse)
    } catch (e) {
        next(e);
    }
}

async function getUserById(req, res, next) {
    try {
        const {user} = req;

        const userForResponse = userPresenter(user);
        res.json(userForResponse);
    } catch (e) {
        next(e);
    }

}

async function createUser(req, res, next) {
    try {
        const {name, email, phone} = req.body;


        const user = await userService.createUser(req.body);

        const {Location} = await uploadFile(req.files.avatar, USER_REF, user._id);

        const userWithPhoto = await userService.updateUser({_id: user._id}, {avatar: Location})


        const sms = smsTemplateBuilder[smsAction.WELCOME]({name});

        await smsService.sendSMS(phone, sms);
        await emailService.sendMail(email, emailAction.WELCOME, {name})


        const userForResponse = userPresenter(userWithPhoto);

        res.status(201).json(userForResponse);
    } catch (e) {
        next(e);
    }
}

async function deleteUserById(req, res, next) {
    try {
        const {id} = req.params;
        await userService.deleteUser({_id: id})
        res.status(204).json('User was deleted')
    } catch (e) {
        next(e);
    }
}

async function updateUserById(req, res, next) {
    try {
        const {id} = req.params;
        const updatedUser = await userService.updateUser({_id: id}, req.body);

        const userForResponse = userPresenter(updatedUser);

        res.status(201).json(userForResponse);
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
