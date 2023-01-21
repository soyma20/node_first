module.exports = {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'ba',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || 'la',

    PORT: process.env.PORT || 3000,
    MONGO_URL : process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/bala',

    NO_REPLY_EMAIL : process.env.NO_REPLY_EMAIL || 'mail@mail.com',
    NO_REPLY_EMAIL_PASSWORD : process.env.NO_REPLY_EMAIL_PASSWORD || 'mailer',

}
