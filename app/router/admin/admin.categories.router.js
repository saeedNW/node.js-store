/** define admin categories router */
const adminCategoriesRouter = require("express").Router();
/** import admin categories controller */
const {AdminCategoryController} = require("app/http/controllers/admin/category/admin.category.controller");

adminCategoriesRouter.post("/add", AdminCategoryController.addCategory);

adminCategoriesRouter.delete("/remove/:categoryId", AdminCategoryController.removeCategory);

adminCategoriesRouter.get("/all", AdminCategoryController.getAllCategories);

adminCategoriesRouter.get("/single/:categoryId", AdminCategoryController.getCategoryById);

adminCategoriesRouter.get("/parents", AdminCategoryController.getParentCategories);

adminCategoriesRouter.get("/children/:categoryId", AdminCategoryController.getChildCategories);

/** export router */
module.exports = {
    adminCategoriesRouter
}