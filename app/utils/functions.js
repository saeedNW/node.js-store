/** import models */
const model = require("app/models");
/** import json web token module */
const JWT = require("jsonwebtoken");
/** import http-error module */
const createError = require("http-errors");
/** import constants */
const {JWTConstants} = require("app/utils/constans");
const {userModel} = require("../models");

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

/**
 * create refresh token
 * @param userId
 * @returns {Promise<*>}
 */
async function signRefreshToken(userId) {
    try {
        /**
         * get user data from database
         */
        const user = await model.userModel.findById(userId);

        /**
         * define refresh token payload
         * @type {{phone: *}}
         */
        const payload = {
            phone: user.phone
        }

        /**
         * define refresh token options
         * @type {{expiresIn: string}}
         */
        const options = {
            expiresIn: "1y"
        };

        /**
         * create and return json web token
         */
        return JWT.sign(payload, JWTConstants.REFRESH_TOKEN_SECRET_KEY, options);
    } catch (err) {
        console.log(err);
        return createError.InternalServerError();
    }
}

/**
 * refresh token verification
 * @param token
 * @returns {Promise<*>}
 */
async function refreshTokenVerification(token) {
    try {
        /**
         * verify jwt token
         * @type {*}
         */
        const payload = JWT.verify(token, JWTConstants.REFRESH_TOKEN_SECRET_KEY);

        /**
         * extract phone number from payload
         */
        const {phone} = payload || {};

        /** return error if phone was not exists in payload */
        if (!phone)
            throw createError.Unauthorized("کد وارد شده صحیح نمی باشد");

        /** get user data from database */
        const user = await userModel.findOne({phone}, {password: 0, otp: 0});

        /** return error if user was not found */
        if (!user)
            throw createError.Unauthorized("حساب کاربری شناسایی نشد وارد حساب کاربری خود شوید");

        return phone;
    } catch (err) {
        console.log(err.message);
        if (err.message === "invalid token") throw createError.Unauthorized("کد وارد شده صحیح نمی باشد"); else throw err;
    }
}

module.exports = {
    randomNumberGenerator,
    signAccessToken,
    signRefreshToken,
    refreshTokenVerification
}