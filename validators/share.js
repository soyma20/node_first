const Joi = require("joi");

const {EMAIL_REGEX,PHONE_REGEX,PASSWORD_REGEX}= require('../constants/constant');

module.exports = {
    nameValidator: Joi.string().alphanum().min(2).max(20),
    emailValidator: Joi.string().lowercase().regex(EMAIL_REGEX),
    ageValidator: Joi.number().integer().min(15).max(130),
    passwordValidator: Joi.string().required().min(8).max(25).regex(PASSWORD_REGEX),
    phoneValidator: Joi.string().required().regex(PHONE_REGEX),
}
