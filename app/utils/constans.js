const userConstants = {
    EXPIRES: new Date().getTime() + 2 * 60 * 1000 /** 2 Min */,
    USER_ROLE: "USER"
}

const JWTConstants = {
    ACCESS_TOKEN_SECRET_KEY: "a5f1d82be76f47bbd7f238a331b9fbf3e4f51c7aefeab3b261c9c62376a7a532",
    REFRESH_TOKEN_SECRET_KEY: "0e7833c5ebd97d67b2db372e604a9d5d467824d250b78e61370b678eeb7a336a",
}

module.exports = {
    userConstants,
    JWTConstants,
}