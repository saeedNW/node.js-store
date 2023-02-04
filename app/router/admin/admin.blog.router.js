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

/**
 * @swagger
 *  /admin/blogs/single/{blogId}:
 *      get:
 *          summary: get single blog post
 *          description: get a single blog post by its id and populate it with category and author fields
 *          tags: [admin-blog]
 *          parameters:
 *              -   name: blogId
 *                  description: blog post _id
 *                  in: path
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
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
adminBlogRouter.get("/single/:blogId", AdminBlogController.getSingleBlog);

/**
 * @swagger
 *  /admin/blogs/remove/{blogId}:
 *
 *      delete:
 *          summary: remove blog post
 *          description: remove single post using its _id
 *          tags: [admin-blog]
 *          parameters:
 *              -   name: blogId
 *                  description: blog post _id
 *                  in: path
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
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
adminBlogRouter.delete("/remove/:blogId", AdminBlogController.removeBlog);

/**
 * @swagger
 *  /admin/blogs/update/{blogId}:
 *      patch:
 *          summary: update a blog
 *          description: update single blog data by its id
 *          tags: [admin-blog]
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   name: blogId
 *                  description: blog post _id
 *                  in: path
 *                  required: true
 *                  type: string
 *              -   name: title
 *                  description: post title
 *                  in: formData
 *                  type: string
 *              -   name: text
 *                  description: post content
 *                  in: formData
 *                  type: string
 *              -   name: summary
 *                  description: post summary
 *                  in: formData
 *                  type: string
 *              -   name: tags
 *                  description: post tags
 *                  in: formData
 *                  type: string
 *                  example: tag1#tag2#tag3
 *              -   name: category
 *                  description: post tags
 *                  in: formData
 *                  type: string
 *              -   name: image
 *                  description: post image
 *                  in: formData
 *                  type: file
 *          responses:
 *              200:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */
adminBlogRouter.patch("/update/:blogId", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.updateBlog);

module.exports = {
    adminBlogRouter
}
