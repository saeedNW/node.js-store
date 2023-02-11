/** import main controller */
const Controller = require("app/http/controllers/controller");

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