/** define admin users router */
const adminUsersRouter = require("express").Router();
/** import admin users controller */
const {AdminUserController} = require("app/http/controllers/admin/users/admin.user.controller");

adminUsersRouter.get('/list', AdminUserController.getAllUsers);

module.exports = {
    adminUsersRouter
}