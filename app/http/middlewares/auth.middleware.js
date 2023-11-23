/** import models */
const {userModel} = require("app/models");

/**
 * Middleware function to check if a user is logged in.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Promise<*>}
 */
async function checkLogin(req, res, next) {
    try {
        /**
         * Retrieve the token from signed cookies in the request
         * @type {string}
         */
        const token = req.signedCookies["authorization"];

        /** Check if a token exists */
        if (token) {
            /**
             * Find the user based on the token and exclude sensitive information
             * @type {*}
             */
            const user = await userModel.findOne({token}, {basket: 0, password: 0, products: 0, courses: 0})

            /** If the user exists, set it in the request object and proceed to the next middleware */
            if (user) {
                req.user = user;
                return next();
            }
        }

        /** If no token or user was found, render the login page with an error message */
        return res.render("pages/login", {
            error: "شما باید وارد حساب کاربری خود شوید"
        });
    } catch (err) {
        /** Pass any errors to the next middleware for handling */
        next(err);
    }
}

/**
 * Middleware function to check access to login page and redirect if the user is already logged in.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {Promise<*>}
 */
async function checkAccessLogin(req, res, next) {
    try {
        /** Retrieve the token from signed cookies in the request */
        const token = req.signedCookies["authorization"];

        /** Check if a token exists */
        if (token) {
            /** Find the user based on the token and exclude sensitive information */
            const user = await userModel.findOne({token}, {basket: 0, password: 0, Products: 0, Courses: 0});

            /** If the user exists, set it in the request object and redirect to the support page */
            if (user) {
                req.user = user;
                return res.redirect("/support");
            }
        }

        /** If no token or user is found, proceed to the next middleware */
        return next();
    } catch (error) {
        /** Pass any errors to the next middleware for handling */
        next(error);
    }
}

module.exports = {
    checkLogin,
    checkAccessLogin
};
