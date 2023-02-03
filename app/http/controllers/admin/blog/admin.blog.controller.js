/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import blog validator */
const {createBlogSchema} = require("app/http/validators/admin/admin.blog.schema");
/** import path module */
const path = require("path");
/** import models */
const {blogModel} = require("app/models/blogs.model");
/** import helper functions */
const {removeFile} = require("app/utils/functions");

/**
 * @class AdminBlogController
 */
class AdminBlogController extends Controller {
    /**
     * add new blog post
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async createBlog(req, res, next) {
        /** get user id from request */
        const userId = req?.user?._id;

        try {
            /** user input validation */
            const blogData = await createBlogSchema.validateAsync(req.body);

            /** add file data to request body image */
            blogData.image = path.join(blogData.fileUploadPath, blogData.fileName);

            /**
             * save image in request body.
             * it will be used to remove file in case of any error
             */
            req.body.imageName = blogData.image

            /** create new blog */
            const blog = await blogModel.create({...blogData, author: userId});

            this.sendSuccessResponse(req, res, 201, "ایجاد بلاگ با موفقیت انجام شد", {blog});
        } catch (err) {
            /** remove uploaded file */
            removeFile(req.body.imageName);
            next(err);
        }
    }

    /**
     * update a post
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async updateBlog(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * remove a post
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async removeBlog(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * get all posts list
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getAllBlogs(req, res, next) {
        try {
            /** get blogs from database */
            const blogs = await blogModel.aggregate([
                {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'author',
                        'foreignField': '_id',
                        'let': {'id': '$_id'},
                        'pipeline': [{
                            '$project': {
                                'first_name': 1,
                                'last_name': 1,
                                'username': 1,
                            }
                        }],
                        'as': 'author'
                    }
                }, {
                    '$unwind': {
                        'path': '$author'
                    }
                }, {
                    '$lookup': {
                        'from': 'categories',
                        'localField': 'category',
                        'foreignField': '_id',
                        'as': 'category'
                    }
                }, {
                    '$unwind': {
                        'path': '$category'
                    }
                }, {
                    '$project': {
                        '__v': 0,
                        'category.__v': 0,
                    }
                }
            ]);

            this.sendSuccessResponse(req, res, 200, undefined, {blogs});
        } catch (err) {
            next(err);
        }
    }

    /**
     * get single post by id
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getSingleBlog(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * get single post comments
     * @param trq
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getBlogComments(trq, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }
}


module.exports = {
    AdminBlogController: new AdminBlogController()
}