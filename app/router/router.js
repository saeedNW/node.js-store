/**
 * import express router
 * define main router
 */
const mainRouter = require("express").Router();

/** import index router */
const {indexRouter} = require("./api/index");
/** initialize index router */
mainRouter.use("/", indexRouter);

/** import user main router */
const {userMainRouter} = require("./user");
/** initialize user router */
mainRouter.use("/user", userMainRouter);

/** export main router */
module.exports = {
    mainRouter
}