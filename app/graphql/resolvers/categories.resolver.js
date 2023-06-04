/** import models */
const {categoryModel} = require("app/models");
/** import graphql access verification */
const {graphqlAccessTokenVerification} = require("app/http/middlewares/verify.access.token.middleware");

/**
 * define category resolver
 */
const CategoryResolver = async (_, args, context) => {
    /** initialize user access verification */
    await graphqlAccessTokenVerification(context);
    /** extract category id from args */
    const {categoryId} = args;
    /** get category data */
    return categoryModel.findOne({_id: categoryId});
}

/**
 * define categories list resolver
 */
const CategoriesListResolver = async (_, args, context) => {
    /** initialize user access verification */
    await graphqlAccessTokenVerification(context);
    /** get categories data */
    return categoryModel.find({});
}

/**
 * define parent categories list resolver
 */
const ParentCategoriesListResolver = async (_, args, context) => {
    /** initialize user access verification */
    await graphqlAccessTokenVerification(context);
    /** get categories data */
    return categoryModel.find({parent: undefined});
}

/**
 * define child categories list resolver
 */
const ChildCategoriesListResolver = async (_, args, context) => {
    /** initialize user access verification */
    await graphqlAccessTokenVerification(context);
    /** extract category parent id from args */
    const {parent} = args;
    /** get category data */
    return categoryModel.find({parent});
}

module.exports = {
    CategoryResolver,
    CategoriesListResolver,
    ParentCategoriesListResolver,
    ChildCategoriesListResolver
}