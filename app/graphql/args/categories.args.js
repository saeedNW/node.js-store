/** import graphql */
const {GraphQLString} = require("graphql");

/**
 * define category objectId argument
 */
const CategoryId = {
    categoryId: {type: GraphQLString},
}

/**
 * define categories parent argument
 */
const CategoryParent = {
    parent: {type: GraphQLString},
}

module.exports = {
    CategoryId,
    CategoryParent
}