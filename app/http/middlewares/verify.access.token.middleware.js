/** import json web token module */
const JWT = require("jsonwebtoken");
/** import http-error module */
const createError = require("http-errors");
/** import constants */
const {JWTConstants} = require("app/utils/constans");
/** import models */
const {userModel} = require("app/models");

/**
 * user access token verification
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function accessTokenVerification(req, res, next) {
    try {
        /** get user access token from request headers */
        const token = getToken(req.headers);

        /**
         * verify jwt token
         * @type {*}
         */
        const payload = JWT.verify(token, JWTConstants.ACCESS_TOKEN_SECRET_KEY);

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

        /** add user data to request */
        req.user = user;

        return next();
    } catch (err) {
        if (err?.status !== 401)
            next(createError.Unauthorized("حساب کاربری شناسایی نشد وارد حساب کاربری خود شوید"));
        else
            next(err);
    }
}

/**
 * check user role for access permission
 * @param role the role that user need to access some certain routes
 * @returns {(function(*, *, *): (*|undefined))|*}
 */
function checkRole(role) {
    return function (req, res, next) {
        try {
            /** get user data */
            const user = req.user;
            /** throw error if user role wasn't equal to given access role */
            if (!user.Roles.includes(role)) throw createError.Forbidden("شما اجازه دسترسی به این بخش را ندارید");

            return next();
        } catch (err) {
            next(err);
        }
    }
}

/**
 * extract user access token from request headers
 * @param headers
 * @returns {*}
 */
function getToken(headers) {
    /**
     * get Barer token from request header.
     * split token to "Barer" and token
     */
    const [Barer, token] = headers?.authorization?.split(" ") || [];

    /**
     * validate token to be a Bearer token.
     * return token if token was valid
     */
    if (token && ["Bearer", "bearer"].includes(Barer)) return token;

    /** return error if token was invalid */
    throw createError.Unauthorized("حساب کاربری شناسایی نشد وارد حساب کاربری خود شوید");
}

module.exports = {
    accessTokenVerification,
    getToken,
    checkRole
}