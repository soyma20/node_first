const Joi = require('joi')

const {emailValidator, nameValidator, ageValidator, passwordValidator, idValidator} = require("./share");

module.exports = {
    newUserValidator: Joi.object({
        name: nameValidator.required(),
        email: emailValidator.required(),
        age: ageValidator,
        password: passwordValidator.required()
    }),

    updateUserValidator: Joi.object({
        name: nameValidator,
        age: ageValidator,
    }),

}
