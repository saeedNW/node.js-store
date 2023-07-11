/** import joi module */
const Joi = require("@hapi/joi");
/** import http-error module */
const createHttpError = require("http-errors");
/** import constants */
const {mongodbConstants} = require("app/utils/constans");

/** define admin add blog post validator schema */
const createBlogSchema = Joi.object({
    /** title validator */
    title: Joi.string().min(3).max(30).error(new createHttpError.UnprocessableEntity("عنوان دسته بندی صحیح نمیباشد")),
    /** contents validator */
    text: Joi.string().error(new createHttpError.UnprocessableEntity("متن ارسال شده صحیح نمیباشد")),
    /** summary validator */
    summary: Joi.string().error(new createHttpError.UnprocessableEntity("متن ارسال شده صحیح نمیباشد")),
    /** file validator */
    fileName: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(new createHttpError.UnprocessableEntity("تصویر ارسال شده صحیح نمیباشد")),
    /** tags validator */
    tags: Joi.array().min(0).max(20).error(new createHttpError.UnprocessableEntity("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    /** category validator */
    category: Joi.string().pattern(mongodbConstants.MongoIdPattern).error(new createHttpError.UnprocessableEntity("دسته بندی مورد نظر یافت نشد")),
    /** upload path validator */
    fileUploadPath: Joi.allow()
});

module.exports = {
    createBlogSchema
}