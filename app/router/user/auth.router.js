/** define user auth router */
const userAuthRouter = require("express").Router();
/** import user auth controller */
const {UserAuthController} = require("app/http/controllers/user/auth/user.auth.controller");

/** initialize user login router */
userAuthRouter.post("/login", UserAuthController.loginProcess);

/** export router */
module.exports = {
    userAuthRouter
}