/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import validators */
const {createProductSchema} = require("app/http/validators/admin/admin.product.schema");
/** import validators */
const {ObjectIdValidator} = require("app/http/validators/public/public.schema");
/** import path module */
const path = require("path");
/** import file removal */
const {removeFile, returnListOfUploadedFiles} = require("app/utils/functions");
/** import models */
const {productModel} = require("app/models");
/** import http-error module */
const createError = require("http-errors");
/** import http status codes module */
const httpStatus = require("http-status-codes");

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
        try {
            /** get user id from request */
            const userId = req?.user?._id;
            /** get list of uploaded images addresses */
            const images = returnListOfUploadedFiles(req?.files || [], req.body.fileUploadPath);
            /** user input validation */
            const productData = await createProductSchema.validateAsync(req.body);
            /** extract data from request body */
            const {
                title, summary, description, tags, category, model, made_in,
                price, discount, count, productType, height, weight, width, length, colors
            } = productData;
            /** define product features */
            const features = {
                model: (!model) ? "" : model,
                made_in: (!made_in) ? "" : made_in,
                colors: (!colors) ? [""] : colors,
                height: (!height || isNaN(+height)) ? 0 : height,
                weight: (!weight || isNaN(+weight)) ? 0 : weight,
                width: (!width || isNaN(+width)) ? 0 : width,
                length: (!length || isNaN(+length)) ? 0 : length,
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
            if (!createdProduct) throw createError.InternalServerError("?????????? ?????????? ???? ???????? ?????????? ???? ???????? ?????????? ???????? ????????????");
            /** return success message */
            return this.sendSuccessResponse(req, res, httpStatus.CREATED, undefined, {createdProduct});
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
            /** get product id from request params */
            const {productId} = req.params;
            /** get product data from database based on product ObjectID */
            const product = await this.findProductById(productId);
            /** todo@ check if any user has bought this product and prevent it from being removed */
            /** remove product from database */
            const removedProduct = await productModel.deleteOne({_id: product._id});
            /** return error if product removal was not successful */
            if (removedProduct.deletedCount <= 0)
                throw createError.InternalServerError("?????? ?????????? ???? ???????? ?????????? ???? ???????? ?????????? ???????? ????????????");
            /** send success response */
            this.sendSuccessResponse(req, res, httpStatus.OK, "?????????? ???? ???????????? ?????? ??????????");
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
            /** get all products from database */
            const products = await productModel.find({});
            /** send success response */
            this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {products});
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
            /** get product id from request params */
            const {productId} = req.params;
            /** get product data from database based on product ObjectID */
            const product = await this.findProductById(productId);
            /** send success response */
            this.sendSuccessResponse(req, res, httpStatus.OK, undefined, {product});
        } catch (err) {
            next(err);
        }
    }

    /**
     * find product by id
     * @param ProductId
     * @returns {Promise<*>}
     */
    async findProductById(ProductId) {
        /** MongoDB ObjectID validator */
        const {id} = await ObjectIdValidator.validateAsync({id: ProductId});
        /** get product from database */
        const product = await productModel.findById(id);
        /** return error if product was not found */
        if (!product) throw createError.NotFound("???????????? ???????? ??????");
        /** return product */
        return product;
    }
}

module.exports = {
    AdminProductController: new AdminProductController()
}