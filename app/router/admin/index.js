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

/** import admin product router */
const {adminProductRouter} = require("./admin.product.router");
/** initialize admin blog router */
adminMainRouter.use("/products", adminProductRouter);

/** import admin courses router */
const {adminCourseRouter} = require("./admin.courses.router");
/** initialize admin blog router */
adminMainRouter.use("/courses", adminCourseRouter);

/** export router */
module.exports = {
    adminMainRouter
}