const ActionToken = require("../dataBase/ActionToken");
module.exports = {
    createActionToken: (actionToken) => {
        return ActionToken.create(actionToken)
    },
    deleteOneActionToken: (params) => {
        return ActionToken.deleteOne(params)
    },
    findOneActionToken: (params) => {
        return ActionToken.findOne(params)
    }
}
