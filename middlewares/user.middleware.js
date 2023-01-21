const CError = require("../error/CustomError");
const userValidator = require("../validators/user.validator")
const User = require("../dataBase/User")
const userService = require("../services/user.service");

module.exports = {
    isNewUserValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);

            if (error) {
                return next(new CError(error.details[0].message, 400));
            }
            next();
        } catch (e) {
            next(e)
        }
    },
    isEmailRegistered: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});
            if (userByEmail) {
                return next(new CError("User with email:" + email + "already exists", 409));
            }
            next()
        } catch (e) {
            next(e)
        }
    },
    isUpdateUserValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                return next(new CError(error.details[0].message, 400));
            }
            next();
        } catch (e) {
            next(e)
        }
    },
    isIdPresented: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await userService.findOneUser({_id : id})
            if (!user) {
               return next(new CError("User not found", 404));
            }
            req.user = user;
            next()
        } catch (e) {
            next(e)
        }
    }
}
