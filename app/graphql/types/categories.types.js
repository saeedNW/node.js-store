/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require("graphql");

/**
 * define category type
 */
const CategoryType = new GraphQLObjectType({
    name: "categoryType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
    }
})

/**
 * define categories list type
 */
const CategoriesListType = new GraphQLList(CategoryType);

module.exports = {
    CategoryType,
    CategoriesListType
}