/** import categories types */
const {CategoryType, CategoriesListType} = require("app/graphql/types/categories.types");
/** import categories resolvers */
const {
    CategoryResolver,
    CategoriesListResolver,
} = require("app/graphql/resolvers/categories.resolver");

/**
 * define category query
 */
const CategoryQuery = {
    type: CategoryType,
    resolve: CategoryResolver
}

/**
 * define categories list query
 */
const CategoriesListQuery = {
    type: CategoriesListType,
    resolve: CategoriesListResolver
}

module.exports = {
    CategoryQuery,
    CategoriesListQuery,
}