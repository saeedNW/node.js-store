/** import models */
const model = require("app/models");
/** import json web token module */
const JWT = require("jsonwebtoken");
/** import http-error module */
const createError = require("http-errors");
/** import constants */
const {JWTConstants} = require("./constans");
/** import redis client configs */
const redisClient = require("./init.redis");
/** import path module */
const path = require("path");
/** import file system module */
const fs = require("fs");

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
         * create and return access token
         */
        return JWT.sign(payload, JWTConstants.ACCESS_TOKEN_SECRET_KEY, options);
    } catch (err) {
        console.log(err);
        return new createError.InternalServerError();
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
         * create refresh token
         */
        const refreshToken = JWT.sign(payload, JWTConstants.REFRESH_TOKEN_SECRET_KEY, options);

        /** save refresh token in redis */
        await redisClient.SETEX(userId.valueOf(), (360 * 24 * 60 * 60), refreshToken);

        return refreshToken;
    } catch (err) {
        console.log(err);
        throw new createError.InternalServerError();
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
            throw new createError.Unauthorized("کد وارد شده صحیح نمی باشد");

        /** get user data from database */
        const user = await model.userModel.findOne({phone}, {password: 0, otp: 0});

        /** return error if user was not found */
        if (!user)
            throw new createError.Unauthorized("حساب کاربری شناسایی نشد وارد حساب کاربری خود شوید");

        /** get refresh token from redis */
        const refreshToken = await redisClient.get(user._id.valueOf() || "key_default");

        /** return error if user's refresh token wasn't match with redis refresh token */
        if (token !== refreshToken)
            throw new createError.Unauthorized("ورود به حساب کاربری با مشکل مواجه شد لطفا مجددا تلاش نمایید");

        return phone;
    } catch (err) {
        console.log(err.message);
        if (err.message === "invalid token") throw new createError.Unauthorized("کد وارد شده صحیح نمی باشد"); else throw err;
    }
}

/**
 * remove file in a specific location
 * @param fileAddress
 */
function removeFile(fileAddress) {
    /**
     * create file absolute path
     * @type {string}
     */
    const fileAbsolutePath = path.join(__dirname, "..", "..", "public", fileAddress);

    /** remove file */
    if (fs.existsSync(fileAbsolutePath))
        fs.unlinkSync(fileAbsolutePath);
}

/**
 * return array of uploaded files address
 * @param files
 * @param fileUploadPath
 * @returns {*|*[]}
 */
function returnListOfUploadedFiles(files, fileUploadPath) {
    /** return empty array if there wasn't any uploaded file */
    if (files?.length <= 0)
        return [];

    /** return array of uploaded files address */
    return files.map(file => path.join(fileUploadPath, file.filename));
}

/**
 * copy the given object
 * @param object
 * @returns {any}
 */
function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
}

/**
 * set product feature
 * @param body
 * @returns {{made_in: (string|*), width: (number|*), length: (number|*), weight: (number|*), model: (string|*), colors: (string[]|*), height: (number|*)}}
 */
function setFeatures(body) {
    /** extract data from request body */
    const {model, made_in, height, weight, width, length, colors} = body;
    /** define product features */
    return {
        model: (!model) ? "" : model,
        made_in: (!made_in) ? "" : made_in,
        colors: (!colors) ? [""] : colors,
        height: (!height || isNaN(+height)) ? 0 : height,
        weight: (!weight || isNaN(+weight)) ? 0 : weight,
        width: (!width || isNaN(+width)) ? 0 : width,
        length: (!length || isNaN(+length)) ? 0 : length,
    };
}

module.exports = {
    randomNumberGenerator,
    signAccessToken,
    signRefreshToken,
    refreshTokenVerification,
    removeFile,
    returnListOfUploadedFiles,
    copyObject,
    setFeatures,
}