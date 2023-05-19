/** import autoBind module */
const autoBind = require("auto-bind");
/** import mongoose module */
const {default: mongoose} = require("mongoose");
/** import file system module */
const fs = require("fs");
/** import http error module */
const createError = require("http-errors");

/**
 * main controller class
 */
module.exports = class Controller {
    /**
     * main controller constructor
     */
    constructor() {
        /** initialize auto bind module */
        autoBind(this);
    }

    /**
     * validation of mongodb ObjectID structure
     * @param _id
     * @param req
     * @return {boolean}
     */
    mongoObjectIdValidation(_id, req = undefined) {
        /**
         * validation of given mongodb object id
         * @type {boolean}
         */
        const validate = mongoose.Types.ObjectId.isValid(_id);

        /** return error if given id is not a valid id */
        if (!validate) {
            /** remove uploaded file if request file exists */
            if (req?.file)
                fs.unlinkSync(req?.file?.path);

            throw new createError.UnprocessableEntity("شناسه وارد شده صحیح نمی باشد");
        }
    }

    /**
     * convert string to mongodb Object id
     * @param id
     * @returns {*}
     */
    convertStringToMongoObjectId(id) {
        /** check if given id is a valid mongodb object id */
        this.mongoObjectIdValidation(id);
        /** convert id from string to mongodb object id */
        return mongoose.Types.ObjectId(id);
    }

    /**
     * send successful response to user
     * @param req express request method
     * @param res express response method
     * @param status success response status
     * @param message success response message
     * @param data success response data
     */
    sendSuccessResponse(req, res, status, message = null, data = {}) {
        res.status(status).json({
            status,
            success: true,
            message: message || "درخواست شما با موفقیت به اتمام رسید",
            data,
        })
    }

    /**
     * convert Persian and Arabic numbers to English numbers
     * @param num
     * @return {string|string}
     */
    fixNumbers(num) {
        /** remove commas */
        num = num ? num.replaceAll(",", '') : num;

        let
            persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
            arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

        if (typeof num === 'string') {
            for (let i = 0; i < 10; i++) {
                num = num.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
            }
        }
        return num ? num.replaceAll(",", '') : num;
    }
}