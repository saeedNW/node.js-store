/** import models */
const model = require("app/models");
/** import json web token module */
const JWT = require("jsonwebtoken");
/** import http-error module */
const createHttpError = require("http-errors");
/** import constants */
const {JWTConstants} = require("./constans");
/** import redis client configs */
const redisClient = require("./init.redis");
/** import path module */
const path = require("path");
/** import file system module */
const fs = require("fs");

/**
 * 5 digit random number generator
 * @returns {number}
 */
function randomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000);
}

/**
 * create access token
 * @param userId
 * @returns {Promise<*>}
 * @constructor
 */
async function signAccessToken(userId) {
    try {
        /**
         * get user data from database
         */
        const user = await model.userModel.findById(userId);

        /**
         * define access token payload
         * @type {{phone: *}}
         */
        const payload = {
            phone: user.phone
        }

        /**
         * define access token options
         * @type {{expiresIn: string}}
         */
        const options = {
            expiresIn: "1d"
        };

        /**
         * create and return access token
         */
        return JWT.sign(payload, JWTConstants.ACCESS_TOKEN_SECRET_KEY, options);
    } catch (err) {
        console.log(err);
        return new createHttpError.InternalServerError();
    }
}

/**
 * create refresh token
 * @param userId
 * @returns {Promise<*>}
 */
async function signRefreshToken(userId) {
    try {
        /**
         * get user data from database
         */
        const user = await model.userModel.findById(userId);

        /**
         * define refresh token payload
         * @type {{phone: *}}
         */
        const payload = {
            phone: user.phone
        }

        /**
         * define refresh token options
         * @type {{expiresIn: string}}
         */
        const options = {
            expiresIn: "1y"
        };

        /**
         * create refresh token
         */
        const refreshToken = JWT.sign(payload, JWTConstants.REFRESH_TOKEN_SECRET_KEY, options);

        /** save refresh token in redis */
        await redisClient.SETEX(userId.valueOf(), (360 * 24 * 60 * 60), refreshToken);

        return refreshToken;
    } catch (err) {
        console.log(err);
        throw new createHttpError.InternalServerError();
    }
}

/**
 * refresh token verification
 * @param token
 * @returns {Promise<*>}
 */
async function refreshTokenVerification(token) {
    try {
        /**
         * verify jwt token
         * @type {*}
         */
        const payload = JWT.verify(token, JWTConstants.REFRESH_TOKEN_SECRET_KEY);

        /**
         * extract phone number from payload
         */
        const {phone} = payload || {};

        /** return error if phone was not exists in payload */
        if (!phone)
            throw new createHttpError.Unauthorized("کد وارد شده صحیح نمی باشد");

        /** get user data from database */
        const user = await model.userModel.findOne({phone}, {password: 0, otp: 0});

        /** return error if user was not found */
        if (!user)
            throw new createHttpError.Unauthorized("حساب کاربری شناسایی نشد وارد حساب کاربری خود شوید");

        /** get refresh token from redis */
        const refreshToken = await redisClient.get(user._id.valueOf() || "key_default");

        /** return error if user's refresh token wasn't match with redis refresh token */
        if (token !== refreshToken)
            throw new createHttpError.Unauthorized("ورود به حساب کاربری با مشکل مواجه شد لطفا مجددا تلاش نمایید");

        return phone;
    } catch (err) {
        console.log(err.message);
        if (err.message === "invalid token") throw new createHttpError.Unauthorized("کد وارد شده صحیح نمی باشد"); else throw err;
    }
}

/**
 * remove file in a specific location
 * @param fileAddress
 */
function removeFile(fileAddress) {
    /**
     * create file absolute path
     * @type {string}
     */
    const fileAbsolutePath = path.join(__dirname, "..", "..", "public", fileAddress);

    /** remove file */
    if (fs.existsSync(fileAbsolutePath))
        fs.unlinkSync(fileAbsolutePath);
}

/**
 * return array of uploaded files address
 * @param files
 * @param fileUploadPath
 * @returns {*|*[]}
 */
function returnListOfUploadedFiles(files, fileUploadPath) {
    /** return empty array if there wasn't any uploaded file */
    if (files?.length <= 0)
        return [];

    /** return array of uploaded files address */
    return files.map(file => path.join(fileUploadPath, file.filename));
}

/**
 * copy the given object
 * @param object
 * @returns {any}
 */
function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
}

/**
 * set product feature
 * @param body
 * @returns {{made_in: (string|*), width: (number|*), length: (number|*), weight: (number|*), model: (string|*), colors: (string[]|*), height: (number|*)}}
 */
function setFeatures(body) {
    /** extract data from request body */
    const {model, made_in, height, weight, width, length, colors} = body;
    /** define product features */
    return {
        model: (!model) ? "" : model,
        made_in: (!made_in) ? "" : made_in,
        colors: (!colors) ? [""] : colors,
        height: (!height || isNaN(+height)) ? 0 : height,
        weight: (!weight || isNaN(+weight)) ? 0 : weight,
        width: (!width || isNaN(+width)) ? 0 : width,
        length: (!length || isNaN(+length)) ? 0 : length,
    };
}

/**
 * remove invalid properties in an object
 * @param data data object that needs to be validated
 * @param blackListFields list of the fields that has to be removed
 */
function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
    /**
     * define invalid and nullish data
     * @type {(string|number)[]}
     */
    let nullishData = ["", " ", "0", 0, null, undefined];

    /** loop over data object properties */
    Object.keys(data).forEach(key => {
        /** remove property if it's a blacked listed data */
        if (blackListFields.includes(key)) delete data[key]
        /** trim string data */
        if (typeof data[key] == "string") data[key] = data[key].trim();
        /** loop over element of array properties and trim them */
        if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
        /** remove array properties if it's empty */
        if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        /** remove property if it's an invalid or nullish data */
        if (nullishData.includes(data[key])) delete data[key];
    })
}

/**
 * convert seconds to full 24-hour format
 * @param seconds
 * @returns {string}
 */
function getTime(seconds) {
    /** convert seconds to minutes */
    let total = Math.round(seconds) / 60;

    /** split conversion result to minutes and percent */
    let [minutes, percent] = String(total).split(".");

    /** calculate seconds from percent */
    let second = Math.round((percent * 60) / 100).toString().substring(0, 2);

    /** define hour */
    let hour = 0;

    /** check if calculated minutes are more than 60 */
    if (minutes > 60) {
        /** convert minutes to hours */
        total = minutes / 60;

        /** split conversion result to hour and percent */
        let [h1, percent] = String(total).split(".");

        /** set hours */
        hour = h1;

        /** calculate and set minutes */
        minutes = Math.round((percent * 60) / 100).toString().substring(0, 2);
    }

    /** add 0 to hour if it's a single digit number 6 => 06 */
    if (String(hour).length === 1) hour = `0${hour}`;
    /** add 0 to minutes if it's a single digit number 6 => 06 */
    if (String(minutes).length === 1) minutes = `0${minutes}`;
    /** add 0 to second if it's a single digit number 6 => 06 */
    if (String(second).length === 1) second = `0${second}`;

    /** return total conversion result */
    return (hour + ":" + minutes + ":" + second);
}

/**
 * return course full time
 * @param chapters course chapters list
 * @returns {string}
 */
function getCourseTotalTime(chapters = []) {
    /** define time variables */
    let duration, hour, minute, second = 0;

    /** loop over chapters */
    for (const chapter of chapters) {
        /** check if there are any episodes in the chapter */
        if (Array.isArray(chapter?.episodes)) {
            /** loop over chapter episodes */
            for (const episode of chapter.episodes) {
                /**
                 * split episode duration time with ":" if episode time has been set.
                 * otherwise, set episode time to "00:00:00" and then split it
                 */
                if (episode?.duration) duration = episode.duration.split(":"); /** [hour, min, second] */
                else duration = "00:00:00".split(":");

                /** check if the time includes hour or just minutes and second */
                if (duration.length === 3) {
                    /** convert episode hour to second and sum with total seconds */
                    second += Number(duration[0]) * 3600;
                    /** convert episode minute to second and sum with total seconds */
                    second += Number(duration[1]) * 60;
                    /** sum episode second with total second */
                    second += Number(duration[2]);
                } else if (duration.length === 2) {
                    /** convert episode minute to second and sum with total seconds */
                    second += Number(duration[0]) * 60;
                    /** sum episode second with total second */
                    second += Number(duration[1]);
                }
            }
        }
    }

    /** convert second to hour */
    hour = Math.floor(second / 3600);
    /** convert second to minutes */
    minute = Math.floor(second / 60) % 60;
    /** convert seconds to second */
    second = Math.floor(second % 60);

    /** add 0 to hour if it's a single digit number 6 => 06 */
    if (String(hour).length === 1) hour = `0${hour}`;
    /** add 0 to minutes if it's a single digit number 6 => 06 */
    if (String(minute).length === 1) minute = `0${minute}`;
    /** add 0 to second if it's a single digit number 6 => 06 */
    if (String(second).length === 1) second = `0${second}`;

    /** return total conversion result */
    return (hour + ":" + minute + ":" + second);
}

/**
 * user basket data retriever
 * @param {object|string} userId - user's object id
 * @returns {Promise<*>} - return user's basket data
 */
async function getUserBasket(userId) {
    /** retrieve user basket data */
    const userData = await model.userModel.aggregate([
        {
            $match: {_id: userId}
        },
        {
            $project: {basket: 1}
        }, {
            $lookup: {
                from: "products",
                localField: "basket.products.productId",
                foreignField: "_id",
                as: "productDetail"
            }
        }, {
            $lookup: {
                from: "courses",
                localField: "basket.courses.courseId",
                foreignField: "_id",
                as: "courseDetail"
            }
        }, {
            $addFields: {
                "productDetail": {
                    /**
                     * calculate user payment
                     * MongoDB $function document => https://www.mongodb.com/docs/manual/reference/operator/aggregation/function/
                     */
                    $function: {
                        body: function (productDetail, products) {
                            return productDetail.map(function (product) {
                                /** get product count in user basket */
                                const count = products.find(item => item.productId.valueOf() === product._id.valueOf()).count;
                                /** calculate user order total price */
                                const totalPrice = count * product.price
                                /** return result */
                                return {
                                    ...product,
                                    basketCount: count,
                                    totalPrice,
                                    /** calculate discount */
                                    finalPrice: Math.ceil(totalPrice - ((product.discount / 100) * totalPrice))
                                }
                            })
                        },
                        args: ["$productDetail", "$basket.products"],
                        lang: "js"
                    }
                },
                "courseDetail": {
                    /** calculate user payment */
                    $function: {
                        body: function (courseDetail) {
                            return courseDetail.map(function (course) {
                                return {
                                    ...course,
                                    /** calculate discount */
                                    finalPrice: Math.ceil(course.price - ((course.discount / 100) * course.price))
                                }
                            })
                        },
                        args: ["$courseDetail"],
                        lang: "js"
                    }
                },
                "payDetail": {
                    $function: {
                        body: function (courseDetail, productDetail, products) {
                            /** calculate course price amount */
                            const courseAmount = courseDetail.reduce(function (total, course) {
                                return Math.ceil(total + (course.price - ((course.discount / 100) * course.price)));
                            }, 0)

                            /** calculate course price amount */
                            const productAmount = productDetail.reduce(function (total, product) {
                                /** get product count in user basket */
                                const count = products.find(item => item.productId.valueOf() === product._id.valueOf()).count;
                                /** calculate user order total price */
                                const totalPrice = count * product.price;
                                /** calculate discount */
                                return Math.ceil(total + (totalPrice - ((product.discount / 100) * totalPrice)));
                            }, 0)

                            /** extract courses' id from courses' data */
                            const courseIds = courseDetail.map(course => course._id.valueOf());
                            /** extract products' id from products' data */
                            const productIds = productDetail.map(product => product._id.valueOf());

                            /** return final data */
                            return {
                                courseAmount,
                                productAmount,
                                paymentAmount: courseAmount + productAmount,
                                courseIds,
                                productIds
                            }
                        },
                        args: ["$courseDetail", "$productDetail", "$basket.products"],
                        lang: "js"
                    }
                },
            }
        }, {
            $project: {
                basket: 0
            }
        }
    ]);

    /** return data */
    return copyObject(userData);
}

module.exports = {
    randomNumberGenerator,
    signAccessToken,
    signRefreshToken,
    refreshTokenVerification,
    removeFile,
    returnListOfUploadedFiles,
    copyObject,
    deleteInvalidPropertyInObject,
    setFeatures,
    getTime,
    getCourseTotalTime,
    getUserBasket,
}