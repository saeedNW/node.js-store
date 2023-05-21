/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import validators */
const {createProductSchema} = require("app/http/validators/admin/admin.product.schema");
/** import validators */
const {ObjectIdValidator} = require("app/http/validators/public/public.schema");
/** import file removal */
const {copyObject, returnListOfUploadedFiles, setFeatures} = require("app/utils/functions");
/** import models */
const {productModel} = require("app/models");
/** import http-error module */
const createError = require("http-errors");
/** import http status codes module */
const httpStatus = require("http-status-codes");
/** define a list of product block-list fields */
const productBlackList = Object.freeze({
    BOOKMARKS: "bookmarks",
    LIKES: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height",
});

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
            const {title, summary, description, tags, category, price, discount, count, productType} = productData;
            /** define product features */
            const features = setFeatures(productData);
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
            if (!createdProduct) throw new createError.InternalServerError("ایجاد محصول با مشکل مواجه شد لطفا مجددا تلاش نمایید");
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
            /** get blog id from request parameters */
            const {productId} = req.params;
            /** get product data from database based on product ObjectID */
            const product = await this.findProductById(productId);
            /** define invalid inputs */
            const invalidInputs = ["", " ", "0", 0, null, undefined];

            /** define fields that can't be updated */
            const blackListedFields = Object.values(productBlackList);

            /** extract data from request body */
            const data = copyObject(req.body);

            /** get list of uploaded images addresses */
            data.images = returnListOfUploadedFiles(req?.files || [], req.body.fileUploadPath);

            /** define product features */
            data.features = setFeatures(req.body);

            /** loop over request body data */
            for (const key of data) {
                /** remove field if it's a black listed one */
                if (blackListedFields.includes(key)) delete data[key];
                /** trim string values */
                if (typeof data[key] === "string") data[key] = data[key].trim();
                /** trim array elements */
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
                /** remove empty arrays */
                if (Array.isArray(data[key]) && data[key].length <= 0) delete data[key];
                /** remove data if it was invalid */
                if (invalidInputs.includes(data[key])) delete data[key];
            }

            /** update product */
            const updatedProduct = await productModel.updateOne({_id: product._id}, {$set: data});

            /** throw error if update was unsuccessful */
            if (updatedProduct.modifiedCount <= 0) throw new createError.ServerInternalError("بروزرسانی با مشکل مواجه شد، لطفا مجددا تلاش نمایید");

            /** send success message */
            this.sendSuccessResponse(req, res, httpStatus.OK, "محصول با موفقیت بروزرسانی شد");
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
                throw new createError.InternalServerError("حذف محصول با شکست مواجه شد لطفا مجددا تلاش نمایید");
            /** send success response */
            this.sendSuccessResponse(req, res, httpStatus.OK, "محصول با موفقیت حذف گردید");
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
        if (!product) throw new createError.NotFound("محصولی یافت نشد");
        /** return product */
        return product;
    }
}

module.exports = {
    AdminProductController: new AdminProductController()
}