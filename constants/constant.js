module.exports = {
    USER_REF: 'user',
    OAUTH_REF: 'oauth',
    ACTION_TOKEN_REF: 'actionToken',
    AUTHORIZATION: 'Authorization',

    PHONE_REGEX: /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/,
    PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[ #?!@$%^&*-]).{8,}$/,
    EMAIL_REGEX: /^([^.@]+)(\.[^.@]+)*@([^.@]+\.)+([^.@]+)$/,
}
