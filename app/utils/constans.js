const userConstants = {
    EXPIRES: new Date().getTime() + 2 * 60 * 1000 /** 2 Min */,
    USER_ROLE: "USER"
}

const JWTConstants = {
    ACCESS_TOKEN_SECRET_KEY: "a7ef1aeba35a1e00f711a0b35a51a626",
}

module.exports = {
    userConstants,
    JWTConstants,
}