module.exports = {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'ba',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || 'la',

    FORGOT_PASSWORD_ACTION_TOKEN: process.env.FORGOT_PASSWORD_ACTION_TOKEN || 'Ga',

    ACTION_TOKEN_EXPIRES_IN: process.env.ACTION_TOKEN_EXPIRES_IN || '15m',
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '30m',

    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/bala',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'mail@mail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 'mailer',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com'
}
