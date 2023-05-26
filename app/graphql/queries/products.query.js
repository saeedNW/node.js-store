/** import products types */
const {ProductsListType, ProductType} = require("app/graphql/types/products.types");
/** import products resolvers */
const {ProductResolver, ProductsListResolver} = require("app/graphql/resolvers/products.resolver");
/** import categories args */
const {ProductId} = require("app/graphql/args/products.args");

/**
 * define product query
 */
const ProductQuery = {
    type: ProductType,
    args: {...ProductId},
    resolve: ProductResolver
}

/**
 * define products list query
 */
const ProductsListQuery = {
    type: ProductsListType,
    resolve: ProductsListResolver
}

module.exports = {
    ProductQuery,
    ProductsListQuery
}