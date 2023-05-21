/** define admin blog router */
const adminBlogRouter = require("express").Router();
/** import admin blog controller */
const {AdminBlogController} = require("app/http/controllers/admin/blog/admin.blog.controller");
/** import image uploader */
const {uploadFile} = require("app/utils/multer");
/** import string to array convertor */
const {stringToArray} = require("app/http/middlewares/string.to.array.middleware");

adminBlogRouter.get("/", AdminBlogController.getAllBlogs);

adminBlogRouter.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog);

adminBlogRouter.get("/single/:blogId", AdminBlogController.getSingleBlog);

adminBlogRouter.delete("/remove/:blogId", AdminBlogController.removeBlog);

adminBlogRouter.patch("/update/:blogId", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.updateBlog);

module.exports = {
    adminBlogRouter
}
