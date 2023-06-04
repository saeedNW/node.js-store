/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require("graphql");
/** import public categories */
const {PublicCategoryType} = require("./public.types");

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
        children: {type: new GraphQLList(PublicCategoryType)}
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