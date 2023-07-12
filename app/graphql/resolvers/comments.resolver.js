/** import graphql access verification */
const {graphqlAccessTokenVerification} = require("app/http/middlewares/verify.access.token.middleware");
/** import graphql utils */
const {
    checkBlogExistence, checkProductExistence,
    checkCommentExistence, checkCourseExistence,
    mongoObjectIdValidation, sendSuccessResponse
} = require("app/graphql/utils");
/** import models */
const {blogModel, productModel, courseModel} = require("app/models");
/** import http-error module */
const createHttpError = require("http-errors");
/** import http status codes module */
const httpStatus = require("http-status-codes");

/**
 * define blog comment creation resolver
 */
const BlogCommentCreationResolver = async (_, args, context) => {
    /**
     * initialize user access verification.
     * get user data
     */
    const user = await graphqlAccessTokenVerification(context);

    /** extract data from arguments */
    const {comment, blogId, parent} = args;

    /** check if the blog id is a valid mongodb object id */
    mongoObjectIdValidation(blogId);

    /** check blog existence */
    await checkBlogExistence(blogId);

    /** update request query */
    const updateRequestQuery = {_id: blogId};

    /** create new comment update request default object */
    let updateRequestObject = {
        comments: {
            comment,
            user: user._id,
            visibility: false,
            openToComment: true,
        }
    }

    /** proceed if the new comment is an  answer to another comment */
    if (parent) {
        /** check if parent is a valid mongodb object id */
        mongoObjectIdValidation(parent);

        /** get parent comment data */
        const parentComment = await checkCommentExistence(blogModel, parent);

        /** return error if the parent comment is closed to answers */
        if (!parentComment.openToComment) throw new createHttpError.BadRequest("ارسال پاسخ مجاز نمی باشد");

        /** set parent comment option in update query */
        updateRequestQuery["comments._id"] = parent;

        /**
         * re-define new comment update request object.
         * define update request object for answer comment
         */
        updateRequestObject = {
            "comments.$.answers": {
                comment,
                user: user._id,
                visibility: false,
                openToComment: false,
            }
        }
    }

    /** add new comment to blog */
    const addNewComment = await blogModel.updateOne({...updateRequestQuery}, {$push: {...updateRequestObject}});

    /** return error if comment was not created successfully */
    if (!addNewComment.modifiedCount) throw new createHttpError.InternalServerError("ثبت نظر با شکست مواجه شد");

    /** send success response */
    return sendSuccessResponse(httpStatus.CREATED, "ثبت نظر با موفقیت انجام شد و پس از تایید ادمین در وبسایت قرار میگیرد");
}

/**
 * define product comment creation resolver
 */
const ProductCommentCreationResolver = async (_, args, context) => {
    /**
     * initialize user access verification.
     * get user data
     */
    const user = await graphqlAccessTokenVerification(context);

    /** extract data from arguments */
    const {comment, productId, parent} = args;

    /** check if the product id is a valid mongodb object id */
    mongoObjectIdValidation(productId);

    /** check product existence */
    await checkProductExistence(productId);

    /** update request query */
    const updateRequestQuery = {_id: productId};

    /** create new comment update request default object */
    let updateRequestObject = {
        comments: {
            comment,
            user: user._id,
            visibility: false,
            openToComment: true,
        }
    }

    /** proceed if the new comment is an  answer to another comment */
    if (parent) {
        /** check if parent is a valid mongodb object id */
        mongoObjectIdValidation(parent);

        /** get parent comment data */
        const parentComment = await checkCommentExistence(productModel, parent);

        /** return error if the parent comment is closed to answers */
        if (!parentComment.openToComment) throw new createHttpError.BadRequest("ارسال پاسخ مجاز نمی باشد");

        /** set parent comment option in update query */
        updateRequestQuery["comments._id"] = parent;

        /**
         * re-define new comment update request object.
         * define update request object for answer comment
         */
        updateRequestObject = {
            "comments.$.answers": {
                comment,
                user: user._id,
                visibility: false,
                openToComment: false,
            }
        }
    }

    /** add new comment to product */
    const addNewComment = await productModel.updateOne({...updateRequestQuery}, {$push: {...updateRequestObject}});

    /** return error if comment was not created successfully */
    if (!addNewComment.modifiedCount) throw new createHttpError.InternalServerError("ثبت نظر با شکست مواجه شد");

    /** send success response */
    return sendSuccessResponse(httpStatus.CREATED, "ثبت نظر با موفقیت انجام شد و پس از تایید ادمین در وبسایت قرار میگیرد");
}

/**
 * define course comment creation resolver
 */
const CourseCommentCreationResolver = async (_, args, context) => {
    /**
     * initialize user access verification.
     * get user data
     */
    const user = await graphqlAccessTokenVerification(context);

    /** extract data from arguments */
    const {comment, courseId, parent} = args;

    /** check if the course id is a valid mongodb object id */
    mongoObjectIdValidation(courseId);

    /** check course existence */
    await checkCourseExistence(courseId);

    /** update request query */
    const updateRequestQuery = {_id: courseId};

    /** create new comment update request default object */
    let updateRequestObject = {
        comments: {
            comment,
            user: user._id,
            visibility: false,
            openToComment: true,
        }
    }

    /** proceed if the new comment is an  answer to another comment */
    if (parent) {
        /** check if parent is a valid mongodb object id */
        mongoObjectIdValidation(parent);

        /** get parent comment data */
        const parentComment = await checkCommentExistence(courseModel, parent);

        /** return error if the parent comment is closed to answers */
        if (!parentComment.openToComment) throw new createHttpError.BadRequest("ارسال پاسخ مجاز نمی باشد");

        /** set parent comment option in update query */
        updateRequestQuery["comments._id"] = parent;

        /**
         * re-define new comment update request object.
         * define update request object for answer comment
         */
        updateRequestObject = {
            "comments.$.answers": {
                comment,
                user: user._id,
                visibility: false,
                openToComment: false,
            }
        }
    }

    /** add new comment to course */
    const addNewComment = await courseModel.updateOne({...updateRequestQuery}, {$push: {...updateRequestObject}});

    /** return error if comment was not created successfully */
    if (!addNewComment.modifiedCount) throw new createHttpError.InternalServerError("ثبت نظر با شکست مواجه شد");

    /** send success response */
    return sendSuccessResponse(httpStatus.CREATED, "ثبت نظر با موفقیت انجام شد و پس از تایید ادمین در وبسایت قرار میگیرد");
}

module.exports = {
    BlogCommentCreationResolver,
    ProductCommentCreationResolver,
    CourseCommentCreationResolver,
}
