const CError = require("../error/CustomError");
const User = require("../dataBase/User");

async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        res.json(users)

    } catch (e) {
        next(e);
    }
}

async function getUserById(req, res, next) {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);

        if (!user) {
            throw new CError('user with ID ' + userId + ' does not exist', 404)
            // return;
        }

        res.json(user);
    } catch (e) {
        next(e);
    }

}
async function createUser(req, res, next) {
    try {
        const user = await User.create(req.body);

        res.status(201).json(user)
    } catch (e) {
        next(e);
    }
}
async function deleteUserById(req, res, next) {
    try {
        const userId = req.params.userId;

        await User.findByIdAndDelete(userId);
        // await User.deleteOne({_id: userId});
        res.status(201).json('User was deleted')
    }catch (e) {
        next(e);
    }
}
async function updateUserById(req, res, next) {
    try {
        const userId = req.params.userId;

        const user = await User.findByIdAndUpdate(userId);

        res.status(201).json(user)
    }catch (e) {
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
