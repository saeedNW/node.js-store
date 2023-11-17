/** import blog model */
const {blogModel} = require("./blogs.model");
/** import category model */
const {categoryModel} = require("./category.model");
/** import payment model */
const {paymentModel} = require("./payments.model");
/** import products model */
const {productModel} = require("./products.model");
/** import products model */
const {courseModel} = require("./courses.model");
/** import sliders model */
const {sliderModel} = require("./sliders.model");
/** import users model */
const {userModel} = require("./users.model");
/** import permissions model */
const {permissionsModel} = require("./permission.model");
/** import roles model */
const {rolesModel} = require("./role.model");
/** import chat model */
const {chatModel} = require("./chat.model");

/** export main model */
module.exports = {
    blogModel,
    categoryModel,
    paymentModel,
    productModel,
    courseModel,
    sliderModel,
    userModel,
    permissionsModel,
    rolesModel,
    chatModel,
}