/** define admin blog router */
const adminBlogRouter = require("express").Router();
/** import admin blog controller */
const {AdminBlogController} = require("app/http/controllers/admin/blog/admin.blog.controller");
/** import image uploader */
const {uploadFile} = require("app/utils/multer");
/** import string to array convertor */
const {stringToArray} = require("app/http/middlewares/string.to.array.middleware");

/**
 * @swagger
 * tags:
 *  name: admin-blog
 *  description: admin blog routes
 */

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          summary: get all blogs
 *          description: get all blog posts as list
 *          tags: [admin-blog]
 *          responses:
 *              200:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal server error
 */
adminBlogRouter.get("/", AdminBlogController.getAllBlogs);

/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          summary: add blog post
 *          description: create new post for blog
 *          tags: [admin-blog]
 *          consumes:
 *              - multipart/form-data
 *              - application/x-www-form-data-urlencoded
 *          parameters:
 *              -   name: title
 *                  description: post title
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: text
 *                  description: post content
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: summary
 *                  description: post summary
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: tags
 *                  description: post tags
 *                  in: formData
 *                  required: false
 *                  type: string
 *                  example: tag1#tag2#tag3
 *              -   name: category
 *                  description: post tags
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: image
 *                  description: post image
 *                  in: formData
 *                  required: true
 *                  type: file
 *          responses:
 *              201:
 *                  description: successful
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */
adminBlogRouter.post("/add", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.createBlog);


module.exports = {
    adminBlogRouter
}
