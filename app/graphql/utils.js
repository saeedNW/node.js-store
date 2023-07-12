/** import graphql king method */
const {Kind} = require("graphql");
/** import models */
const {blogModel} = require("app/models");
/** import http-error module */
const createHttpError = require("http-errors");
/** import mongoose */
const {default: mongoose} = require("mongoose");
/** import helper functions */
const {copyObject} = require("app/utils/functions");

/**
 * Parses an object value from a value node.
 * @param valueNode - The value node to parse.
 * @returns {Object} - The parsed object.
 */
function parseObject(valueNode) {
    /** Create an empty object using null as the prototype */
    const value = Object.create(null);

    /** Iterate over each field in the value node */
    valueNode.fields.forEach(field => {
        /** Assign the parsed value of the field to the corresponding property in the object */
        value[field.name.value] = parseValueNode(field.value);
    });

    /** Return the parsed object */
    return value;
}

/**
 * Parses a value node and returns the corresponding value.
 * @param valueNode - The value node to parse.
 * @returns {*} - The parsed value.
 */
function parseValueNode(valueNode) {
    /** Switch over value node kind */
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            /** If the value node is a string or boolean, return the value as is */
            return valueNode.value;
        case Kind.INT:
        case Kind.FLOAT:
            /** If the value node is an integer or float, convert the value to a number and return it */
            return Number(valueNode.value);
        case Kind.OBJECT:
            /** If the value node is an object, parse the object and return it */
            return parseObject(valueNode.value);
        case Kind.LIST:
            /** If the value node is a list, parse each value in the list and return the array of parsed values */
            return valueNode.values.map(parseValueNode);
        default:
            /** For any other kind of value node, return null */
            return null;
    }
}

/**
 * Parses a literal value node and returns the corresponding value.
 * @param valueNode - The literal value node to parse.
 * @returns {*} - The parsed value.
 */
function parseLiteral(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
            /**
             * If the value node is a string, check if it starts with "{".
             * If it does, parse the value as JSON. Otherwise, return the value as is.
             */
            return valueNode.value.charAt(0) === '{' ? JSON.parse(valueNode.value) : valueNode.value;
        case Kind.INT:
        case Kind.FLOAT:
            /** If the value node is an integer or float, convert the value to a number and return it */
            return Number(valueNode.value);
        case Kind.OBJECT:
            /**
             * Handle parsing an object value node here
             * ...
             * Add the necessary code to parse the object value node
             * ...
             */
            break;
        /** Return null ass default value */
        default:
            return null;
    }
}

/**
 * Converts a value to an object if it is of object type or a JSON string.
 * @param {*} value - The value to convert.
 * @returns {object|null} - The converted object, or null if conversion is not possible.
 */
function toObject(value) {
    /** If the value is already an object, return it as is */
    if (typeof value === 'object') {
        return value;
    }

    /** If the value is a string and starts with '{', parse it as JSON and return the parsed object */
    if (typeof value === "string" && value.charAt(0) === "{") {
        return JSON.parse(value);
    }

    /** Return null if the value is not an object or a JSON string */
    return null;
}

/**
 * check if a blog exists by blog _id
 * @param _id blog object id
 * @returns {QueryWithHelpers<HydratedDocument<unknown, {}, {}> | null, HydratedDocument<unknown, {}, {}>, {}, unknown>}
 */
async function checkBlogExistence(_id) {
    /** get blog data from database */
    const blog = await blogModel.findOne({_id});

    /** throw error if blog was not found */
    if (!blog) throw new createHttpError.NotFound("بلاگی با این مشخصات یافت نشد");

    /** return blog data */
    return blog;
}

/**
 * check if a comment exists
 * @param model model that comment belongs to
 * @param _id comment object id
 * @returns {Promise<*>}
 */
async function checkCommentExistence(model, _id) {
    /** get comment from database */
    let comment = await model.findOne({"comments._id": new mongoose.Types.ObjectId(_id)}, {"comments.$": 1});

    /** copy comment data */
    comment = copyObject(comment);

    /** return error if comment was not found */
    if (!comment?.comments?.[0]) throw new createHttpError.NotFound("کامنتی با این مشخصات یافت نشد");

    /** return comment data */
    return comment?.comments?.[0]
}

/**
 * validation of mongodb ObjectID structure
 * @param _id
 * @return {boolean}
 */
function mongoObjectIdValidation(_id) {
    /**
     * validation of given mongodb object id
     * @type {boolean}
     */
    const validate = mongoose.Types.ObjectId.isValid(_id);

    /** return error if given id is not a valid id */
    if (!validate) {
        throw new createHttpError.BadGateway("شناسه وارد شده صحیح نمی باشد");
    }
}

function sendSuccessResponse(status, message = undefined, data = {}) {
    return {
        status,
        success: true,
        message: message || "درخواست شما با موفقیت به اتمام رسید",
        data
    }
}

module.exports = {
    parseObject,
    parseValueNode,
    parseLiteral,
    toObject,
    checkBlogExistence,
    checkCommentExistence,
    mongoObjectIdValidation,
    sendSuccessResponse
}