/** import graphql */
const {GraphQLString} = require("graphql");

/**
 * define category objectId argument
 */
const CategoryId = {
    categoryId: {type: GraphQLString},
}

module.exports = {
    CategoryId
}