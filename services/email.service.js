const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD,FRONTEND_URL} = require('../constants/config');
const emailTemplates = require('../email-templates');
const CError = require("../error/CustomError");

module.exports = {
    sendMail: async (userEmail = '', emailAction = '', locals = {}) => {
        const transporter = nodemailer.createTransport({
            from: 'No reply',
            auth: {
                user: NO_REPLY_EMAIL,
                pass: NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail'
        });
        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: "main",
                layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
            },
            viewPath: path.join(process.cwd(), 'email-templates'),
            extName: '.hbs',
        }

        transporter.use('compile', hbs(hbsOptions))

        const templateInfo = emailTemplates[emailAction]

        if (!templateInfo) {
            throw new CError("Wrong email action", 500)
        }

        locals.frontendURL = FRONTEND_URL

        return transporter.sendMail({
            to: userEmail,
            subject: templateInfo.subject,
            template: templateInfo.template,
            context: locals
        });
    }
}
