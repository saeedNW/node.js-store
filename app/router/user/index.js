/**
 * import express router
 * define user main router
 */
const userMainRouter = require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: user-authentication
 *          description: users authentication routes
 */

/** import user auth router */
const {userAuthRouter} = require("./user.auth.router");
/** initialize user auth router */
userMainRouter.use("/auth", userAuthRouter);

/** export router */
module.exports = {
    userMainRouter
}