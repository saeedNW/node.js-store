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

/** import admin main router */
const {adminMainRouter} = require("./admin");
/** initialize admin router */
mainRouter.use("/admin", adminMainRouter);

/** export main router */
module.exports = {
    mainRouter
}