/** define user auth router */
const userAuthRouter = require("express").Router();
/** import user auth controller */
const {UserAuthController} = require("app/http/controllers/user/auth/user.auth.controller");

userAuthRouter.post("/get-otp", UserAuthController.getOTPProcess);

userAuthRouter.post("/check-otp", UserAuthController.checkOTPProcess);

userAuthRouter.post("/refresh-token", UserAuthController.refreshTokenGenerator);

/** export router */
module.exports = {
    userAuthRouter
}