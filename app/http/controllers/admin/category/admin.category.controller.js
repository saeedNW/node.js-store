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
        /** extract categoryId from request params */
        const {categoryId} = req.params;

        try {
            /** check if the given id is a valid mongodb ObjectId */
            this.mongoObjectIdValidation(req, categoryId);

            /** get category from database by id */
            const category = await categoryModel.findById(categoryId);

            /** return error if category was not found */
            if (!category) throw createError.NotFound("دسته بندی درخواست شده پیدا نشد");

            /** remove category */
            const removedCategory = await categoryModel.deleteOne({_id: categoryId});

            /** return error if category removal was not successful */
            if (removedCategory.deleteCount <= 0)
                throw createError.InternalServerError("حذف دسته بندی با شکت مواجه شد لطفا مجددا تلاش نمایید");

            /** remove parent from children categories */
            await categoryModel.updateMany({parent: categoryId}, {$set: {parent: undefined}});

            /** todo@ remove category from blog posts and products */

            this.sendSuccessResponse(req, res, 200, "دسته بندی با موفقیت حذف گردید");
        } catch (err) {
            next(err);
        }
    }

    /**
     * get all the categories
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getAllCategories(req, res, next) {
        try {
            /** get all the categories from database */
            const categories = await categoryModel.aggregate([
                {
                    '$lookup': {
                        'from': 'categories',
                        'localField': '_id',
                        'foreignField': 'parent',
                        'as': "children"
                    }
                }, {
                    '$project': {
                        '__v': 0,
                        'children.__v': 0,
                        'children.parent': 0
                    }
                },
                {
                    '$match': {
                        'parent': undefined
                    }
                }
            ]);

            this.sendSuccessResponse(req, res, 200, undefined, {categories});
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
        /** extract categoryId from request params */
        const {categoryId} = req.params;

        try {
            /** check if the given id is a valid mongodb ObjectId */
            this.mongoObjectIdValidation(req, categoryId);

            /** get category from database by id */
            const category = await categoryModel.findById(categoryId);

            this.sendSuccessResponse(req, res, 200, undefined, {category});
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
            /**
             * get categories that has no parent.
             * categories without parents are the parents
             */
            const categories = await categoryModel.find({parent: undefined}, {__v: 0});

            this.sendSuccessResponse(req, res, 200, undefined, {categories});
        } catch (err) {
            next(err);
        }
    }

    /**
     * get child categories of a parent category
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getChildCategories(req, res, next) {
        /** extract parentId from request params */
        const {parentId: parent} = req.params;

        try {
            /** check if the given id is a valid mongodb ObjectId */
            this.mongoObjectIdValidation(req, parent);

            /** get categories with given parent id */
            const categories = await categoryModel.find({parent}, {__v: 0, parent: 0});

            this.sendSuccessResponse(req, res, 200, undefined, {categories});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    AdminCategoryController: new AdminCategoryController()
}