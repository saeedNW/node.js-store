/** define admin categories router */
const adminCategoriesRouter = require("express").Router();
/** import admin categories controller */
const {AdminCategoryController} = require("app/http/controllers/admin/category/admin.category.controller");
/** import permission guard middleware */
const {permissionGuard} = require("app/http/middlewares/permission.guard.middleware");
/** import permission constants */
const {permissionConstants} = require("app/utils/constans");

adminCategoriesRouter.post("/add",
    permissionGuard([permissionConstants.addCategories]),
    AdminCategoryController.addCategory);

adminCategoriesRouter.delete("/remove/:categoryId",
    permissionGuard([permissionConstants.removeCategories]),
    AdminCategoryController.removeCategory);

adminCategoriesRouter.get("/all",
    permissionGuard([permissionConstants.showCategories]),
    AdminCategoryController.getAllCategories);

adminCategoriesRouter.get("/single/:categoryId",
    permissionGuard([permissionConstants.singleCategory]),
    AdminCategoryController.getCategoryById);

adminCategoriesRouter.get("/parents",
    permissionGuard([permissionConstants.showParentsCategories]),
    AdminCategoryController.getParentCategories);

adminCategoriesRouter.get("/children/:categoryId",
    permissionGuard([permissionConstants.showChildrenCategories]),
    AdminCategoryController.getChildCategories);

/** export router */
module.exports = {
    adminCategoriesRouter
}