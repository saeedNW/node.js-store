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
 *  components:
 *      schemas:
 *          AddBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   summary
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: blog title
 *                  text:
 *                      type: text
 *                      description: blog content
 *                  summary:
 *                      type: text
 *                      description: blog summary text
 *                  tags:
 *                      type: string
 *                      description: blog tags, should be separated by hashtag
 *                      example: tag1#tag2#tag3
 *                  category:
 *                      type: string
 *                      description: _id of the category that blog, belongs to
 *                  image:
 *                      type: file
 *                      description: blog image
 *          UpdateBlog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: blog title
 *                  text:
 *                      type: text
 *                      description: blog content
 *                  summary:
 *                      type: text
 *                      description: blog summary text
 *                  tags:
 *                      type: string
 *                      description: blog tags, should be separated by hashtag
 *                  category:
 *                      type: string
 *                      description: _id of the category that blog, belongs to
 *                  image:
 *                      type: file
 *                      description: blog image
 *      parameters:
 *          BlogId:
 *              name: blogId
 *              in: path
 *              type: string
 *              required: true
 *              schema:
 *                  type: string
 *              description: blog ObjectId
 */

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          summary: get all blogs
 *          description: get all blog posts as list
 *          tags: [AdminPanel(Blog)]
 *          responses:
 *              200:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: forbidden
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
 *          tags: [AdminPanel(Blog)]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddBlog'
 *          responses:
 *              201:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: forbidden
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
 *          tags: [AdminPanel(Blog)]
 *          parameters:
 *              -   $ref: '#/components/parameters/BlogId'
 *          responses:
 *              200:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: forbidden
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
 *          tags: [AdminPanel(Blog)]
 *          parameters:
 *              -   $ref: '#/components/parameters/BlogId'
 *          responses:
 *              200:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: forbidden
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
 *          tags: [AdminPanel(Blog)]
 *          parameters:
 *              -   $ref: '#/components/parameters/BlogId'
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateBlog'
 *          responses:
 *              200:
 *                  description: successful
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: forbidden
 *              422:
 *                  description: Validation error
 *              500:
 *                  description: Internal server error
 */
adminBlogRouter.patch("/update/:blogId", uploadFile.single("image"), stringToArray("tags"), AdminBlogController.updateBlog);

module.exports = {
    adminBlogRouter
}
