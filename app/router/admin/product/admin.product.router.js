/** define admin product router */
const adminProductRouter = require("express").Router();
/** import admin product controller */
const {AdminProductController} = require("app/http/controllers/admin/product/admin.product.controller");
/** import file uploader */
const {uploadFile} = require("app/utils/multer");
/** import string to array convertor */
const {stringToArray} = require("app/http/middlewares/string.to.array.middleware");

adminProductRouter.post("/new", uploadFile.array("images", 10), stringToArray("tags", "body"), stringToArray("colors", "body"), AdminProductController.addProduct);

adminProductRouter.patch("/edit/:productId", uploadFile.array("images", 10), stringToArray("tags", "body"), stringToArray("colors", "body"), AdminProductController.updateProduct);

adminProductRouter.delete("/remove/:productId", AdminProductController.removeProduct);

adminProductRouter.get("/all", AdminProductController.getAllProducts);

adminProductRouter.get("/single/:productId", AdminProductController.getSingleProduct);

module.exports = {
    adminProductRouter
}