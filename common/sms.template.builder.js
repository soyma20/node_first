const smsAction = require("../enums/sms.action.enum");
module.exports = {
    [smsAction.WELCOME]: ({name}) => {
        return `Hi ${name} welcome on our platform`;
    }
}
