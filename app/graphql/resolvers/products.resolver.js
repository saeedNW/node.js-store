/** import models */
const {productModel} = require("app/models");

/**
 * define product resolver
 */
const ProductResolver = async (_, args) => {
    const {productId} = args;
    return productModel.findOne({_id: productId}).populate([{path: 'supplier'}, {path: 'category'}]);
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