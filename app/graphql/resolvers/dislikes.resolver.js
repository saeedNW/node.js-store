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
 * define product dislike resolver
 */
const ProductDislikeResolver = async (_, args, context) => {
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

    /** add or remove user's dislike */
    if (isDisliked(product, user._id)) {
        /**
         * proceed if the product is already Disliked by the user.
         * remove user's dislike
         */
        const updateResult = await productModel.updateOne({'_id': new mongoose.Types.ObjectId(productId)}, {'$pull': {'dislikes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    } else {
        /**
         * proceed if the product isn't Disliked by the user.
         * remove user's like if it exists
         */
        const removeLikeResult = await productModel.updateOne({'_id': new mongoose.Types.ObjectId(productId)}, {'$pull': {'likes': user._id}});

        /** return error if the update process failed */
        if (removeLikeResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");

        /** add user's dislike */
        const updateResult = await productModel.updateOne({'_id': new mongoose.Types.ObjectId(productId)}, {'$push': {'dislikes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * define course dislike resolver
 */
const CourseDislikeResolver = async (_, args, context) => {
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

    /** add or remove user's dislike */
    if (isDisliked(course, user._id)) {
        /**
         * proceed if the course is already Disliked by the user.
         * remove user's dislike
         */
        const updateResult = await courseModel.updateOne({'_id': new mongoose.Types.ObjectId(courseId)}, {'$pull': {'dislikes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    } else {
        /**
         * proceed if the course isn't Disliked by the user.
         * remove user's like if it exists
         */
        const removeLikeResult = await courseModel.updateOne({'_id': new mongoose.Types.ObjectId(courseId)}, {'$pull': {'likes': user._id}});

        /** return error if the update process failed */
        if (removeLikeResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");

        /** add user's dislike */
        const updateResult = await courseModel.updateOne({'_id': new mongoose.Types.ObjectId(courseId)}, {'$push': {'dislikes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * define Blog dislike resolver
 */
const BlogDislikeResolver = async (_, args, context) => {
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

    /** add or remove user's dislike */
    if (isDisliked(blog, user._id)) {
        /**
         * proceed if the blog is already Disliked by the user.
         * remove user's dislike
         */
        const updateResult = await blogModel.updateOne({'_id': new mongoose.Types.ObjectId(blogId)}, {'$pull': {'dislikes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    } else {
        /**
         * proceed if the blog isn't Disliked by the user.
         * remove user's like if it exists
         */
        const removeLikeResult = await blogModel.updateOne({'_id': new mongoose.Types.ObjectId(blogId)}, {'$pull': {'likes': user._id}});

        /** return error if the update process failed */
        if (removeLikeResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");

        /** add user's dislike */
        const updateResult = await blogModel.updateOne({'_id': new mongoose.Types.ObjectId(blogId)}, {'$push': {'dislikes': user._id}});

        /** return error if the update process failed */
        if (updateResult.modifiedCount <= 0) throw new createHttpError.ServerInternalError("فرایند با مشکل مواجه شد، لطفا مجددا تلاش نمایید");
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * check if the item has been disliked by the user or not
 * @param item item data
 * @param userId user object id
 * @returns {boolean}
 */
function isDisliked(item, userId) {
    /** check if item dislikes includes user's object id */
    return !!item.dislikes.includes(userId);
}

module.exports = {
    ProductDislikeResolver,
    CourseDislikeResolver,
    BlogDislikeResolver,
}