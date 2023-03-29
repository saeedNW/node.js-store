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
/** import http error module */
const createError = require("http-errors");
/** import http status codes module */
const httpStatus = require("http-status-codes");

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
            req.body.imageName = blogData.image;

            /** create new blog */
            const blog = await blogModel.create({...blogData, author: userId});

            this.sendSuccessResponse(req, res, httpStatus.CREATED, "ایجاد بلاگ با موفقیت انجام شد", {blog});
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
        /** get blog id from request parameters */
        const {blogId} = req.params;
        /**
         * define invalid inputs
         * @type {(string|number)[]}
         */
        const invalidInputs = ["", " ", "0", 0, null, undefined];
        /**
         * define fields that can't be updated
         * @type {string[]}
         */
        const blackListedFields = ["author", "comments", "likes", "dislike", "bookmark"];

        try {
            /** check if the given id is a valid mongodb ObjectId */
            this.mongoObjectIdValidation(blogId);

            /** check if blog exists */
            const blog = await this.getBlog({'_id': blogId});

            /** proceed if new image was uploaded */
            if (req?.body?.fileUploadPath && req?.body?.fileName) {
                /** remove blog previous image */
                removeFile(blog.image);
                /** add file data to request body image if file was uploaded */
                req.body.image = path.join(req.body.fileUploadPath, req.body.fileName);
            }

            /** loop over request body data */
            for (const key of Object.keys(req.body)) {
                /** remove field if it's a black listed one */
                if (blackListedFields.includes(key)) delete req.body[key];
                /** trim string values */
                if (typeof req.body[key] === "string") req.body[key] = req.body[key].trim();
                /** trim array elements */
                if (Array.isArray(req.body[key]) && req.body[key].length > 0) req.body[key] = req.body[key].map(item => item.trim());
                /** remove data if it was invalid */
                if (invalidInputs.includes(req.body[key])) delete req.body[key]
            }

            /** update blog */
            const updatedBlog = await blogModel.updateOne({'_id': blogId}, {$set: req.body});

            /** throw error if update was unsuccessful */
            if (updatedBlog.modifiedCount <= 0) throw createError.ServerInternalError("بروزرسانی با مشکل مواجه شد، لطفا مجددا تلاش نمایید");

            this.sendSuccessResponse(req, res, httpStatus.OK, "بروزرسانی با موفقیت انجام شد");
        } catch (err) {
            /** remove uploaded file */
            removeFile(req.body.image);
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
        /** get blog id from request parameters */
        const {blogId} = req.params;

        try {
            /** check if the given id is a valid mongodb ObjectId */
            this.mongoObjectIdValidation(blogId);

            /** get blog data */
            const blog = await this.getBlog({'_id': blogId});

            /** remove blog */
            const removedBlog = await blogModel.deleteOne({'_id': blogId});

            if (removedBlog.deleteCount <= 0)
                throw createError.InternalServerError("حذف پست با مشکل مواجه شد لطفا مجددا تلاش نمایید");

            this.sendSuccessResponse(req, res, httpStatus.OK, "پست با موفقیت حذف شد");
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

            this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {blogs});
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
        /** get blog id from request parameters */
        const {blogId} = req.params;

        try {
            /** check if the given id is a valid mongodb ObjectId */
            this.mongoObjectIdValidation(blogId);

            /** get blog data */
            const blog = await this.getBlog({'_id': blogId}, [
                {
                    path: 'category',
                    select: ['title'],
                },
                {
                    path: 'author',
                    select: ['first_name', 'last_name', 'username'],
                }
            ]);

            this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {blog});
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

    /**
     * get blog post based on given query
     * @param query search query
     * @param populate mongoose populate option
     * @returns {Promise<*>}
     */
    async getBlog(query = {}, populate = null) {
        /** get blog data from database */
        let blog = await blogModel.findOne({...query});

        /** throw error if blog was not found */
        if (!blog)
            throw createError.NotFound("بلاگ درخواست شده پیدا نشد");

        /** add populate option to search query */
        if (populate)
            blog = await blog.populate(populate);

        return blog;
    }
}


module.exports = {
    AdminBlogController: new AdminBlogController()
}