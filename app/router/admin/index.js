/**
 * import express router
 * define admin main router
 */
const adminMainRouter = require("express").Router();

/** import admin category router */
const {adminCategoriesRouter} = require("./category/admin.categories.router");
/** initialize admin category router */
adminMainRouter.use("/category", adminCategoriesRouter);

/** import admin blog router */
const {adminBlogRouter} = require("./blog/admin.blog.router");
/** initialize admin blog router */
adminMainRouter.use("/blogs", adminBlogRouter);

/** import admin product router */
const {adminProductRouter} = require("./product/admin.product.router");
/** initialize admin product router */
adminMainRouter.use("/products", adminProductRouter);

/** import admin courses router */
const {adminCourseRouter} = require("./course/admin.courses.router");
/** initialize admin courses router */
adminMainRouter.use("/courses", adminCourseRouter);

/** import admin chapters router */
const {adminChapterRouter} = require("./course/admin.chapter.router");
/** initialize admin chapters router */
adminMainRouter.use("/chapters", adminChapterRouter);

/** import admin episode router */
const {adminEpisodeRouter} = require("./course/admin.episode.router");
/** initialize admin episode router */
adminMainRouter.use("/episodes", adminEpisodeRouter);

/** export router */
module.exports = {
    adminMainRouter
}