/** import blog model */
const {blogModel} = require("./blogs.model");
/** import category model */
const {categoryModel} = require("./category.model");
/** import payment model */
const {paymentModel} = require("./payments.model");
/** import products model */
const {productModel} = require("./products.model");
/** import sliders model */
const {sliderModel} = require("./sliders.model");
/** import users model */
const {userModel} = require("./users.model");

/** export main model */
module.exports = {
    blogModel,
    categoryModel,
    paymentModel,
    productModel,
    sliderModel,
    userModel,
}