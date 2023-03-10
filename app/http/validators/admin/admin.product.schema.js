/** import joi module */
const Joi = require("@hapi/joi");
/** import http-error module */
const createError = require("http-errors");
/** import constants */
const {mongodbConstants} = require("app/utils/constans");

/** define admin add product validator schema */
const createProductSchema = Joi.object({
    /** title validator */
    title: Joi.string().min(3).max(30).error(createError.UnprocessableEntity("عنوان محصول صحیح نمیباشد")),
    /** contents validator */
    description: Joi.string().error(createError.UnprocessableEntity("متن ارسال شده صحیح نمیباشد")),
    /** summary validator */
    summary: Joi.string().error(createError.UnprocessableEntity("متن ارسال شده صحیح نمیباشد")),
    /** tags validator */
    tags: Joi.array().min(0).max(20).error(createError.UnprocessableEntity("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    /** colors validator */
    colors: Joi.array().min(0).max(10).error(createError.UnprocessableEntity("رنگ ها نمیتواند بیشتر از 10 ایتم باشد")),
    /** category validator */
    category: Joi.string().regex(mongodbConstants.MongoIdPattern).error(createError.UnprocessableEntity("دسته بندی مورد نظر یافت نشد")),
    /** price validator */
    price: Joi.number().error(createError.UnprocessableEntity("قیمت وارد شده صحیح نمیباشد")),
    /** discount validator */
    discount: Joi.number().error(createError.UnprocessableEntity("تخفیف وارد شده صحیح نمیباشد")),
    /** count validator */
    count: Joi.number().error(createError.UnprocessableEntity("تعداد وارد شده صحیح نمیباشد")),
    /** product type validator */
    productType: Joi.string().regex(/(virtual|physical)/i).error(createError.UnprocessableEntity("نوع محصول وارد شده صحیح نمیباشد")),
    /** product weight validator */
    weight: Joi.number().allow(null, 0, "0").error(createError.UnprocessableEntity("وزن وارد شده صحیح نمیباشد")),
    /** product length validator */
    length: Joi.number().allow(null, 0, "0").error(createError.UnprocessableEntity("طول وارد شده صحیح نمیباشد")),
    /** product height validator */
    height: Joi.number().allow(null, 0, "0").error(createError.UnprocessableEntity("ارتفاع وارد شده صحیح نمیباشد")),
    /** product width validator */
    width: Joi.number().allow(null, 0, "0").error(createError.UnprocessableEntity("عرض وارد شده صحیح نمیباشد")),
    /** product model validator */
    model: Joi.string().allow(null, "", " ").error(createError.UnprocessableEntity("مدل وارد شده صحیح نمیباشد")),
    /** product made_in validator */
    made_in: Joi.string().allow(null, "", " ").error(createError.UnprocessableEntity("کشور وارد شده صحیح نمیباشد")),
    /** file validator */
    fileName: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.UnprocessableEntity("تصویر ارسال شده صحیح نمیباشد")),
    /** upload path validator */
    fileUploadPath: Joi.allow()
});

module.exports = {
    createProductSchema
}