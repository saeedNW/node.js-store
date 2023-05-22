/** define admin roles router */
const adminPermissionRouter = require("express").Router();
/** import admin episodes controller */
const {AdminPermissionController} = require("app/http/controllers/admin/RBAC/admin.permission.controller");

adminPermissionRouter.get('/list', AdminPermissionController.getPermissionsList);

module.exports = {
    adminPermissionRouter
}