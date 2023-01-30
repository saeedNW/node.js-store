/** import joi module */
const Joi = require("@hapi/joi");
/** import http-error module */
const createError = require("http-errors");
/** import constants */
const {mongodbConstants} = require("app/utils/constans");

/** define admin add category validator schema */
const addCategorySchema = Joi.object({
    /** title validator */
    title: Joi.string().min(3).max(30).error(createError.UnprocessableEntity("عنوان دسته بندی صحیح نمیباشد")),
    /** parent validator */
    parent: Joi.string().allow('').pattern(mongodbConstants.MongoIdPattern).allow("").error(createError.UnprocessableEntity("شناسه ارسال شده صحیح نمیباشد"))
});

module.exports = {
    addCategorySchema
}