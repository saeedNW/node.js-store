/**
 * import express router
 * define user main router
 */
const userMainRouter = require("express").Router();

/** import user auth router */
const {userAuthRouter} = require("./auth.router");
/** initialize user auth router */
userMainRouter.use("/auth", userAuthRouter);

/** export router */
module.exports = {
    userMainRouter
}