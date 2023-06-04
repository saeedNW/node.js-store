/** import categories types */
const {CategoryType, CategoriesListType} = require("app/graphql/types/categories.types");
/** import categories resolvers */
const {
    CategoryResolver, CategoriesListResolver,
    ParentCategoriesListResolver, ChildCategoriesListResolver
} = require("app/graphql/resolvers/categories.resolver");
/** import categories args */
const {CategoryId, CategoryParent} = require("app/graphql/args/categories.args");

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

/**
 * define child categories list query
 */
const ChildCategoriesList = {
    type: CategoriesListType,
    args: {...CategoryParent},
    resolve: ChildCategoriesListResolver
}

module.exports = {
    CategoryQuery,
    CategoriesListQuery,
    ParentCategoriesList,
    ChildCategoriesList,
}