const {Types} = require('mongoose');

const CError = require("../error/CustomError");

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const {id} = req.params;

            if (!Types.ObjectId.isValid(id)) {
                return next(new CError('Not valid id', 404))
            }
            next();
        } catch (e) {
            next(e)
        }
    }
}
