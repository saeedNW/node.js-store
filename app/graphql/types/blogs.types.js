/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLList} = require("graphql");
/** import graphql iso-date-type module */
const {GraphQLDateTime} = require("graphql-iso-date");
/** import public types */
const {UserType, PublicCategoryType} = require("./public.types");
/** import comments type */
const {CommentsListType} = require("./comments.type");

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
        comments: {type: CommentsListType},
        likes: {type: new GraphQLList(UserType)},
        dislikes: {type: new GraphQLList(UserType)},
        createdAt: {type: GraphQLDateTime},
        updatedAt: {type: GraphQLDateTime},
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