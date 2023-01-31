const CError = require("../error/CustomError");
const { IMAGE_MAX_SIZE, IMAGE_MIMETYPES} = require("../constants/constant");

module.exports = {
    checkPhoto: async (req, res, next) => {
        try {
            if (req.files) {
                return next();
            }

            const {mimetype, size} = req.files.avatar;

            if (size > IMAGE_MAX_SIZE) {
                return next(new CError('Max size 3MB', 403));
            }
            if (!IMAGE_MIMETYPES.includes(mimetype)) {
                return next(new CError('Wrong file type', 403));
            }

            next()
        } catch (e) {
            next(e)
        }
    },

}
