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
 * define product like resolver
 */
const ProductLikeResolver = async (_, args, context) => {
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

    /** add or remove user's like */
    if (isLiked(product, user._id)) {
        /**
         * proceed if the product is already liked by the user.
         * remove user's like
         */
        const updateResult = await productModel.updateOne({'_id': new mongoose.Types.ObjectId(productId)}, {'$pull': {'likes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    } else {
        /**
         * proceed if the product isn't liked by the user.
         * add user's like
         */
        const updateResult = await productModel.updateOne({'_id': new mongoose.Types.ObjectId(productId)}, {'$push': {'likes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * define course like resolver
 */
const CourseLikeResolver = async (_, args, context) => {
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

    /** add or remove user's like */
    if (isLiked(course, user._id)) {
        /**
         * proceed if the course is already liked by the user.
         * remove user's like
         */
        const updateResult = await courseModel.updateOne({'_id': new mongoose.Types.ObjectId(courseId)}, {'$pull': {'likes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    } else {
        /**
         * proceed if the course isn't liked by the user.
         * add user's like
         */
        const updateResult = await courseModel.updateOne({'_id': new mongoose.Types.ObjectId(courseId)}, {'$push': {'likes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * define Blog like resolver
 */
const BlogLikeResolver = async (_, args, context) => {
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

    /** add or remove user's like */
    if (isLiked(blog, user._id)) {
        /**
         * proceed if the blog is already liked by the user.
         * remove user's like
         */
        const updateResult = await blogModel.updateOne({'_id': new mongoose.Types.ObjectId(blogId)}, {'$pull': {'likes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    } else {
        /**
         * proceed if the blog isn't liked by the user.
         * add user's like
         */
        const updateResult = await blogModel.updateOne({'_id': new mongoose.Types.ObjectId(blogId)}, {'$push': {'likes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * check if the item has been liked by the user or not
 * @param item item data
 * @param userId user object id
 * @returns {boolean}
 */
function isLiked(item, userId) {
    /** check if item likes includes user's object id */
    return !!item.likes.includes(userId);
}

module.exports = {
    ProductLikeResolver,
    CourseLikeResolver,
    BlogLikeResolver,
}