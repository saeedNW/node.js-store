/** import categories types */
const {CategoryType, CategoriesListType} = require("app/graphql/types/categories.types");
/** import categories resolvers */
const {
    CategoryResolver,
    CategoriesListResolver,
    ParentCategoriesListResolver
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