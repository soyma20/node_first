const twilio = require('twilio');

const {TWILIO_NUMBER, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN} = require('../constants/config');

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

module.exports = {
    sendSMS: async (phone, message) => {
        try {
            await client.messages
                .create({
                    from: TWILIO_NUMBER,
                    to: phone,
                    body: message
                })
        } catch (e) {
            console.error('something went wrong' + e)
        }
    }

}
