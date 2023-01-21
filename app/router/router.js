/**
 * import express router
 * define main router
 */
const mainRouter = require("express").Router();

/** import index router */
const {indexRouter} = require("./api/index");
/** initialize index router */
mainRouter.use("/", indexRouter);

/** export main router */
module.exports = {
    mainRouter
}