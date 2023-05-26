/** import products types */
const {ProductsListType, ProductType} = require("app/graphql/types/products.types");
/** import products resolvers */
const {ProductResolver, ProductsListResolver} = require("app/graphql/resolvers/product.resolver");

/**
 * define product query
 */
const ProductQuery = {
    type: ProductType,
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