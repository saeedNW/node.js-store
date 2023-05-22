/** define admin blog router */
const adminBlogRouter = require("express").Router();
/** import admin blog controller */
const {AdminBlogController} = require("app/http/controllers/admin/blog/admin.blog.controller");
/** import image uploader */
const {uploadFile} = require("app/utils/multer");
/** import string to array convertor */
const {stringToArray} = require("app/http/middlewares/string.to.array.middleware");
/** import permission guard middleware */
const {permissionGuard} = require("app/http/middlewares/permission.guard.middleware");
/** import permission constants */
const {permissionConstants} = require("app/utils/constans");

adminBlogRouter.get("/",
    permissionGuard([permissionConstants.showBlogs]),
    AdminBlogController.getAllBlogs);

adminBlogRouter.post("/add",
    permissionGuard([permissionConstants.addBlogs]),
    uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog);

adminBlogRouter.get("/single/:blogId",
    permissionGuard([permissionConstants.showBlogs]),
    AdminBlogController.getSingleBlog);

adminBlogRouter.delete("/remove/:blogId",
    permissionGuard([permissionConstants.removeBlogs]),
    AdminBlogController.removeBlog);

adminBlogRouter.patch("/update/:blogId",
    permissionGuard([permissionConstants.editBlogs]),
    uploadFile.single("image"), stringToArray("tags"), AdminBlogController.updateBlog);

module.exports = {
    adminBlogRouter
}
