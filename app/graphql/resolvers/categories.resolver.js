/** import models */
const {categoryModel} = require("app/models");

/**
 * define category resolver
 */
const CategoryResolver = async (_, args) => {
    const {categoryId} = args;
    return categoryModel.findOne({_id: categoryId});
}

/**
 * define categories list resolver
 */
const CategoriesListResolver = async () => {
    return categoryModel.find({});
}

/**
 * define parent categories list resolver
 */
const ParentCategoriesListResolver = async () => {
    return categoryModel.find({parent: undefined});
}

module.exports = {
    CategoryResolver,
    CategoriesListResolver,
    ParentCategoriesListResolver,
}