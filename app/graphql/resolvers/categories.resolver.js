/** import models */
const {categoryModel} = require("app/models");

/**
 * define category resolver
 */
const CategoryResolver = async () => {
    return categoryModel.findOne({});
}

/**
 * define categories list resolver
 */
const CategoriesListResolver = async () => {
    return categoryModel.find({parent: undefined});
}

module.exports = {
    CategoryResolver,
    CategoriesListResolver,
}