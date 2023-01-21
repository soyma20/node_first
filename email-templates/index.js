const emailAction = require('../enums/email.action.enum')

module.exports = {
    [emailAction.WELCOME]: {
        subject: "Welcome on board",
        template: 'welcome'
    },
    [emailAction.FORGOT_PASSWORD]: {
        subject: "Oops looks like you forgot password",
        template: 'forgot.password'
    }
}
