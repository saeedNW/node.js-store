/** import graphql access verification */
const {graphqlAccessTokenVerification} = require("app/http/middlewares/verify.access.token.middleware");
/** import graphql utils */
const {
    checkBlogExistence, checkProductExistence, sendSuccessResponse,
    checkCourseExistence, mongoObjectIdValidation
} = require("app/graphql/utils");
/** import models */
const {productModel, courseModel, blogModel} = require("app/models");
/** import mongoose */
const {default: mongoose} = require("mongoose");
/** import http-error module */
const createHttpError = require("http-errors");
/** import http status codes module */
const httpStatus = require("http-status-codes");

/**
 * define product bookmark resolver
 */
const ProductBookmarkResolver = async (_, args, context) => {
    /**
     * initialize user access verification.
     * get user data
     */
    const user = await graphqlAccessTokenVerification(context);

    /** extract data from arguments */
    const {productId} = args;

    /** check if the product id is a valid mongodb object id */
    mongoObjectIdValidation(productId);

    /** check product existence */
    const product = await checkProductExistence(productId);

    /** add or remove user's bookmark */
    if (isBookmarked(product, user._id)) {
        /**
         * proceed if the product is already bookmarked by the user.
         * remove user's bookmark
         */
        const updateResult = await productModel.updateOne({'_id': new mongoose.Types.ObjectId(productId)}, {'$pull': {'bookmarks': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    } else {
        /** add user's bookmark */
        const updateResult = await productModel.updateOne({'_id': new mongoose.Types.ObjectId(productId)}, {'$push': {'bookmarks': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * define course bookmark resolver
 */
const CourseBookmarkResolver = async (_, args, context) => {
    /**
     * initialize user access verification.
     * get user data
     */
    const user = await graphqlAccessTokenVerification(context);

    /** extract data from arguments */
    const {courseId} = args;

    /** check if the course id is a valid mongodb object id */
    mongoObjectIdValidation(courseId);

    /** check course existence */
    const course = await checkCourseExistence(courseId);

    /** add or remove user's bookmark */
    if (isBookmarked(course, user._id)) {
        /**
         * proceed if the course is already bookmarked by the user.
         * remove user's bookmark
         */
        const updateResult = await courseModel.updateOne({'_id': new mongoose.Types.ObjectId(courseId)}, {'$pull': {'bookmarks': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    } else {
        /** add user's bookmark */
        const updateResult = await courseModel.updateOne({'_id': new mongoose.Types.ObjectId(courseId)}, {'$push': {'bookmarks': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * define Blog bookmark resolver
 */
const BlogBookmarkResolver = async (_, args, context) => {
    /**
     * initialize user access verification.
     * get user data
     */
    const user = await graphqlAccessTokenVerification(context);

    /** extract data from arguments */
    const {blogId} = args;

    /** check if the blog id is a valid mongodb object id */
    mongoObjectIdValidation(blogId);

    /** check blog existence */
    const blog = await checkBlogExistence(blogId);

    /** add or remove user's bookmark */
    if (isBookmarked(blog, user._id)) {
        /**
         * proceed if the blog is already bookmarked by the user.
         * remove user's bookmark
         */
        const updateResult = await blogModel.updateOne({'_id': new mongoose.Types.ObjectId(blogId)}, {'$pull': {'bookmarks': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    } else {
        /** add user's bookmark */
        const updateResult = await blogModel.updateOne({'_id': new mongoose.Types.ObjectId(blogId)}, {'$push': {'bookmarks': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * check if the item has been bookmarked by the user or not
 * @param item item data
 * @param userId user object id
 * @returns {boolean}
 */
function isBookmarked(item, userId) {
    /** check if item bookmarks includes user's object id */
    return !!item.bookmarks.includes(userId);
}

module.exports = {
    ProductBookmarkResolver,
    CourseBookmarkResolver,
    BlogBookmarkResolver,
}