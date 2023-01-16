const CError = require("../error/CustomError");

const userValidator = require("../validators/user.validator")
const User = require("../dataBase/User")

module.exports = {
    isNewUserValid:(req, res, next)=>{
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);

            if (error){
                throw new CError(error.details[0].message, 400)
            }
            next();
        }catch (e) {
            next(e)
        }
    },
    isEmailRegistered: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});
            if (userByEmail){
                throw new CError("User with email:" +email + "already exists",409)
            }
            next()

        }catch (e) {
            next(e)
        }
    },
    isUpdateUserValid: (req, res, next)=>{
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);

            if (error){
                throw new CError(error.details[0].message, 400)
            }
            next();
        }catch (e) {
            next(e)
        }
    },
    isIdPresented: async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const userById = await User.findById(userId);
            if (!userById){
                throw new CError("User does not exist")
            }
            next()
        }catch (e) {
            next(e)
        }
    }

}
