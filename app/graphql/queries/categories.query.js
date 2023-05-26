/** import categories types */
const {CategoryType, CategoriesListType} = require("app/graphql/types/categories.types");
/** import categories resolvers */
const {
    CategoryResolver, CategoriesListResolver,
    ParentCategoriesListResolver
} = require("app/graphql/resolvers/categories.resolver");
/** import categories args */
const {CategoryId} = require("app/graphql/args/categories.args");

/**
 * define category query
 */
const CategoryQuery = {
    type: CategoryType,
    args: {...CategoryId},
    resolve: CategoryResolver
}

/**
 * define categories list query
 */
const CategoriesListQuery = {
    type: CategoriesListType,
    resolve: CategoriesListResolver
}

/**
 * define parents categories list query
 */
const ParentCategoriesList = {
    type: CategoriesListType,
    resolve: ParentCategoriesListResolver
}

module.exports = {
    CategoryQuery,
    CategoriesListQuery,
    ParentCategoriesList,
}