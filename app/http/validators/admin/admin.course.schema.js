/** import joi module */
const Joi = require("@hapi/joi");
/** import http-error module */
const createError = require("http-errors");
/** import constants */
const {mongodbConstants} = require("app/utils/constans");

/** define admin add course validator schema */
const createCourseSchema = Joi.object({
    /** title validator */
    title: Joi.string().min(3).max(30).error(new createError.UnprocessableEntity("عنوان دوره صحیح نمیباشد")),
    /** contents validator */
    description: Joi.string().error(new createError.UnprocessableEntity("متن ارسال شده صحیح نمیباشد")),
    /** summary validator */
    summary: Joi.string().error(new createError.UnprocessableEntity("متن ارسال شده صحیح نمیباشد")),
    /** tags validator */
    tags: Joi.array().min(0).max(20).error(new createError.UnprocessableEntity("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    /** category validator */
    category: Joi.string().regex(mongodbConstants.MongoIdPattern).error(new createError.UnprocessableEntity("دسته بندی مورد نظر یافت نشد")),
    /** price validator */
    price: Joi.number().error(new createError.UnprocessableEntity("قیمت وارد شده صحیح نمیباشد")),
    /** discount validator */
    discount: Joi.number().error(new createError.UnprocessableEntity("تخفیف وارد شده صحیح نمیباشد")),
    /** course type validator */
    courseType: Joi.string().regex(/(free|cash|vip)/i).error(new createError.UnprocessableEntity("نوع دوره وارد شده صحیح نمیباشد")),
    /** file validator */
    fileName: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(new createError.UnprocessableEntity("تصویر ارسال شده صحیح نمیباشد")),
    /** upload path validator */
    fileUploadPath: Joi.allow()
});

module.exports = {
    createCourseSchema
}