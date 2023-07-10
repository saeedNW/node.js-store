/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLList} = require("graphql");
/** import public types */
const {UserType, PublicCategoryType} = require("./public.types");

/**
 * define blog type
 */
const BlogType = new GraphQLObjectType({
    name: 'blogType',
    fields: {
        _id: {type: GraphQLString},
        author: {type: UserType},
        title: {type: GraphQLString},
        summary: {type: GraphQLString},
        text: {type: GraphQLString},
        image: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCategoryType},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
    }
});

/**
 * define blogs list type
 */
const BlogsListType = new GraphQLList(BlogType);

module.exports = {
    BlogType,
    BlogsListType
}