/**
 * import express router
 * define admin main router
 */
const adminMainRouter = require("express").Router();

/** import admin category router */
const {adminCategoriesRouter} = require("./admin.categories.router");
/** initialize admin category router */
adminMainRouter.use("/category", adminCategoriesRouter);

/** export router */
module.exports = {
    adminMainRouter
}