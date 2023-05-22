/** define admin roles router */
const adminRoleRouter = require("express").Router();
/** import admin episodes controller */
const {AdminRoleController} = require("app/http/controllers/admin/RBAC/admin.role.controller");

adminRoleRouter.get('/list', AdminRoleController.getRolesList);

// adminRoleRouter.post('/new', AdminRoleController.addRole);

module.exports = {
    adminRoleRouter
}