const OAuth = require("../dataBase/OAuth");
module.exports = {
    createOauth: (oauth) => {
        return OAuth.create(oauth)
    },
    deleteOneOauth: (params) => {
        return OAuth.deleteOne(params)
    },
    findOneOauth: (params) => {
        return OAuth.findOne(params)
    }
}
