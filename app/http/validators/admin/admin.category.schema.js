/** import joi module */
const Joi = require("@hapi/joi");
/** import http-error module */
const createHttpError = require("http-errors");
/** import constants */
const {mongodbConstants} = require("app/utils/constans");

/** define admin add category validator schema */
const addCategorySchema = Joi.object({
    /** title validator */
    title: Joi.string().min(3).max(30).error(new createHttpError.UnprocessableEntity("عنوان دسته بندی صحیح نمیباشد")),
    /** parent validator */
    parent: Joi.string().allow('').pattern(mongodbConstants.MongoIdPattern).allow("").error(new createHttpError.UnprocessableEntity("شناسه ارسال شده صحیح نمیباشد"))
});

module.exports = {
    addCategorySchema
}