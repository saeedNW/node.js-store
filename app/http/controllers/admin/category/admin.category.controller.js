/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import models */
const {categoryModel} = require("app/models");
/** import http error module */
const createError = require("http-errors");
/** import validators */
const {addCategorySchema} = require("app/http/validators/admin/admin.category.schema");

/**
 * @class AdminCategoryController
 */
class AdminCategoryController extends Controller {
    /**
     * add new category
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async addCategory(req, res, next) {
        /** extract data from request body */
        const {title, parent} = req.body;

        console.log(req.body);

        try {
            /**
             * user input validation
             */
            await addCategorySchema.validateAsync(req.body);

            /** get parent category */
            const parentCategory = (parent && (parent !== "" || parent !== " ")) ? await categoryModel.findById(parent) : undefined;

            /** return error if parent category was not found */
            if (parent && !parentCategory) throw createError.NotFound("دسته بندی والد انتخاب شده وجود ندارد");

            /** save category in database */
            const category = await categoryModel.create({title, parent});

            /** return error if category creation wasn't successful */
            if (!category) throw createError.InternalServerError("ایجاد دسته بندی با مشکل مواجه شد لطفا مجددا تلاش نمایید");

            this.sendSuccessResponse(req, res, 201, "دسته بندی با موفقیت ایجاد شد", {category});
        } catch (err) {
            next(err);
        }
    }

    /**
     * edit category
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async editCategory(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * remove category
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async removeCategory(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * get all of the categories
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getAllCategories(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * get single category by id
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getCategoryById(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * get parent categories list
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getParentCategories(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }

    /**
     * get child categories list
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getChildCategories(req, res, next) {
        try {

        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    AdminCategoryController: new AdminCategoryController()
}