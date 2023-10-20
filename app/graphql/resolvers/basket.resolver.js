/** import graphql access verification */
const {graphqlAccessTokenVerification} = require("app/http/middlewares/verify.access.token.middleware");
/** import graphql utils */
const {
    checkProductExistence, sendSuccessResponse,
    checkCourseExistence, mongoObjectIdValidation
} = require("app/graphql/utils");
/** import models */
const {userModel} = require("app/models");
/** import http status codes module */
const httpStatus = require("http-status-codes");
/** import helper functions */
const {copyObject} = require("app/utils/functions");

/**
 * define add product to basket resolver
 */
const AddProductToBasketResolver = async (_, args, context) => {
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
    await checkProductExistence(productId);

    /** retrieve product data from user basket */
    const product = await findProductInBasket(user._id, productId);

    /** proceed based on product existence */
    if (product) {
        /** update product count if it was found in user's basket */
        await userModel.updateOne({
            '_id': user._id,
            'basket.products.productId': productId
        }, {
            $inc: {'basket.products.$.count': 1}
        });
    } else {
        /** add product to user's basket if it was not found */
        await userModel.updateOne({
            '_id': user._id,
        }, {
            $push: {
                'basket.products': {
                    productId,
                    count: 1
                }
            }
        });
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * define add course to basket resolver
 */
const AddCourseToBasketResolver = async (_, args, context) => {
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
    await checkCourseExistence(courseId);

    /** retrieve course data from user basket */
    const course = await findCourseInBasket(user._id, courseId);

    /** proceed based on course existence */
    if (course) {
        /** update course count if it was found in user's basket */
        await userModel.updateOne({
            '_id': user._id,
            'basket.courses.courseId': courseId
        }, {
            $inc: {'basket.courses.$.count': 1}
        });
    } else {
        /** add course to user's basket if it was not found */
        await userModel.updateOne({
            '_id': user._id,
        }, {
            $push: {
                'basket.courses': {
                    courseId,
                    count: 1
                }
            }
        });
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * retrieve chosen product from user basket
 * @param {object|string} userId - user object id
 * @param {object|string} productId - product object id
 * @returns {Promise<*>} - return founded product data
 */
async function findProductInBasket(userId, productId) {
    /** retrieve user basket product data from database */
    const basketProduct = await userModel.findOne({
        '_id': userId,
        'basket.products.productId': productId
    }, {'basket.products.$': 1});

    /** copy product data */
    const product = copyObject(basketProduct);

    /** return product data */
    return product?.basket?.products?.[0];
}

/**
 * retrieve chosen course from user basket
 * @param {object|string} userId - user object id
 * @param {object|string} courseId - course object id
 * @returns {Promise<*>} - return founded product data
 */
async function findCourseInBasket(userId, courseId) {
    /** retrieve user basket course data from database */
    const basketCourse = await userModel.findOne({
        '_id': userId,
        'basket.courses.courseId': courseId
    }, {'basket.courses.$': 1});

    /** copy course data */
    const course = copyObject(basketCourse);

    /** return courses data */
    return course?.basket?.courses?.[0];
}

module.exports = {
    AddProductToBasketResolver,
    AddCourseToBasketResolver,
}