/** import graphql access verification */
const {graphqlAccessTokenVerification} = require("app/http/middlewares/verify.access.token.middleware");
/** import graphql utils */
const {
    checkProductExistence, sendSuccessResponse,
    checkCourseExistence, mongoObjectIdValidation
} = require("app/graphql/utils");
/** import models */
const {userModel} = require("app/models");
/** import http-error module */
const createHttpError = require("http-errors");
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

    /** throw error if the course was in user basket */
    if (course)
        throw new createHttpError.BadRequest("این دوره از پیش در سبد خرید وجود دارد.")

    /** add course to user's basket */
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

    /** send success response */
    return sendSuccessResponse(httpStatus.OK);
}

/**
 * define remove product from basket resolver
 */
const RemoveProductFromBasketResolver = async (_, args, context) => {
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

    /** throe error if the product was not found */
    if (!product) throw new createHttpError.NotFound('محصول مورد نظر در سبد خرید یافت نشد');

    /** proceed based on product count */
    if (product.count > 1) {
        /** update product count if its count was more than 1 */
        await userModel.updateOne({
            '_id': user._id,
            'basket.products.productId': productId
        }, {
            $inc: {'basket.products.$.count': -1}
        });
    } else {
        /** remove product from user's basket if its count was less than equal to 1 */
        await userModel.updateOne({
            '_id': user._id,
            'basket.products.productId': productId
        }, {
            $pull: {
                'basket.products': {
                    productId,
                }
            }
        });
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK, 'محصول با موفقیت از سبد خرید حذف شد');
}

/**
 * define remove course from basket resolver
 */
const RemoveCourseFromBasketResolver = async (_, args, context) => {
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

    /** throe error if the course was not found */
    if (!course) throw new createHttpError.NotFound('دوره مورد نظر در سبد خرید یافت نشد');

    /** proceed based on course count */
    if (course.count > 1) {
        /** update course count if its count was more than 1 */
        await userModel.updateOne({
            '_id': user._id,
            'basket.courses.courseId': courseId
        }, {
            $inc: {'basket.courses.$.count': -1}
        });
    } else {
        /** remove course from user's basket if its count was less than equal to 1 */
        await userModel.updateOne({
            '_id': user._id,
            'basket.courses.courseId': courseId
        }, {
            $pull: {
                'basket.courses': {
                    courseId,
                }
            }
        });
    }

    /** send success response */
    return sendSuccessResponse(httpStatus.OK, 'دوره با موفقیت از سبد خرید حذف شد');
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
    RemoveProductFromBasketResolver,
    RemoveCourseFromBasketResolver,
}