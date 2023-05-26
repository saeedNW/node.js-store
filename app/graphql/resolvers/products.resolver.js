/** import models */
const {productModel} = require("app/models");

/**
 * define product resolver
 */
const ProductResolver = async () => {
    return productModel.findOne({}).populate([{path: 'supplier'}, {path: 'category'}]);
}

/**
 * define products list resolver
 */
const ProductsListResolver = async () => {
    return productModel.find({}).populate([{path: 'supplier'}, {path: 'category'}]);
}

module.exports = {
    ProductResolver,
    ProductsListResolver
}