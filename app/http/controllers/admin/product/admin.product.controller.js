/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import validators */
const {createProductSchema} = require("app/http/validators/admin/admin.product.schema");
/** import path module */
const path = require("path");
/** import file removal */
const {removeFile, returnListOfUploadedFiles} = require("app/utils/functions");
/** import models */
const {productModel} = require("app/models");
/** import http-error module */
const createError = require("http-errors");

/**
 * @class AdminProductController
 */
class AdminProductController extends Controller {
    /**
     * add new product
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async addProduct(req, res, next) {
        /** get user id from request */
        const userId = req?.user?._id;

        try {
            /** get list of uploaded images addresses */
            const images = returnListOfUploadedFiles(req?.files || [], req.body.fileUploadPath);

            /** user input validation */
            const productData = await createProductSchema.validateAsync(req.body);

            /** extract data from request body */
            const {
                title, summary, description, tags, category, model, made_in,
                price, discount, count, productType, height, weight, width, length, colors
            } = productData;

            console.log(req.body.fileName)

            /** define product features */
            const features = {
                model: (!model) ? "" : model,
                made_in: (!made_in) ? "" : made_in,
                colors: (!colors) ? [""] : colors,
                height: (!height) ? 0 : height,
                weight: (!weight) ? 0 : weight,
                width: (!width) ? 0 : width,
                length: (!length) ? 0 : length,
            };

            /** add product to database */
            const createdProduct = await productModel.create({
                title,
                summary,
                description,
                images,
                tags,
                category,
                price,
                discount,
                count,
                productType,
                supplier: userId,
                features
            });

            /** return error if product was not saved */
            if (!createdProduct) throw createError.InternalServerError("ایجاد محصول با مشکل مواجه شد لطفا مجددا تلاش نمایید");

            /** return success message */
            return this.sendSuccessResponse(req, res, 201, undefined, {createdProduct});
        } catch (err) {
            next(err);
        }
    }

    /**
     * update product
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async updateProduct(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * remove product
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async removeProduct(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * get all products
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getAllProducts(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * get single product by id
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getSingleProduct(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    AdminProductController: new AdminProductController()
}