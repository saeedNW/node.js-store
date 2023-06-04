/** import models */
const {productModel} = require("app/models");
/** import graphql access verification */
const {graphqlAccessTokenVerification} = require("app/http/middlewares/verify.access.token.middleware");

/**
 * define product resolver
 */
const ProductResolver = async (_, args, context) => {
    /** initialize user access verification */
    await graphqlAccessTokenVerification(context);
    /** extract product id from args */
    const {productId} = args;
    /** get product data */
    return productModel.findOne({_id: productId}).populate([{path: 'supplier'}, {path: 'category'}]);
}

/**
 * define products list resolver
 */
const ProductsListResolver = async (_, args, context) => {
    /** initialize user access verification */
    await graphqlAccessTokenVerification(context);
    /** get products data */
    return productModel.find({}).populate([{path: 'supplier'}, {path: 'category'}]);
}

module.exports = {
    ProductResolver,
    ProductsListResolver
}