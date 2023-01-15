const CError = require("../error/CustomError");

module.exports = {
    checkUserOnCreate: (req, res, next) => {
        try {
            const {name = '', email = '', age = 0, password = ''} = req.body
            if (!name || !email || !password){
                throw new CError("Some filed is missing",400)
            }

            next()

        } catch (e) {
            next(e)
        }

    }
}
