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

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,


    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,

    AWS_S3_BUCKET_URL: process.env.AWS_S3_BUCKET_URL,
}
