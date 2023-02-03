/**
 * import express router
 * define admin main router
 */
const adminMainRouter = require("express").Router();

/** import admin category router */
const {adminCategoriesRouter} = require("./admin.categories.router");
/** initialize admin category router */
adminMainRouter.use("/category", adminCategoriesRouter);

/** import admin blog router */
const {adminBlogRouter} = require("./admin.blog.router");
/** initialize admin blog router */
adminMainRouter.use("/blogs", adminBlogRouter);

/** export router */
module.exports = {
    adminMainRouter
}