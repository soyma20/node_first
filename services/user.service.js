const User = require("../dataBase/User");

module.exports = {
    findUsers :  (params = {}) => {
        return User.find(params);
    },
    findOneUser : (params = {})=>{
        return User.findOne(params);
    },
    createUser : (user)=>{
        return User.create(user)
    },
    updateUser : (id, userData, options = {new: true})=>{
        return User.findByIdAndUpdate(id, userData, options)
    },
    deleteUser : (id)=>{
        return User.deleteOne({_id: id});
    },
}
