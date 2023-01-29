/** import models */
const model = require("app/models");
/** import json web token module */
const JWT = require("jsonwebtoken");
/** import http-error module */
const createError = require("http-errors");
/** import constants */
const {JWTConstants} = require("app/utils/constans");

/**
 * 5 digit random number generator
 * @returns {number}
 */
function randomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000);
}

/**
 * create access token
 * @param userId
 * @returns {Promise<*>}
 * @constructor
 */
async function signAccessToken(userId) {
    try {
        /**
         * get user data from database
         */
        const user = await model.userModel.findById(userId);

        /**
         * define access token payload
         * @type {{phone: *}}
         */
        const payload = {
            phone: user.phone
        }

        /**
         * define access token options
         * @type {{expiresIn: string}}
         */
        const options = {
            expiresIn: "1d"
        };

        /**
         * create and return json web token
         */
        return JWT.sign(payload, JWTConstants.ACCESS_TOKEN_SECRET_KEY, options);
    } catch (err) {
        console.log(err);
        return createError.InternalServerError();
    }
}

module.exports = {
    randomNumberGenerator,
    signAccessToken
}