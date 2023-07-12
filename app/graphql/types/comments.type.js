/** import graphql */
const {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList} = require("graphql");
/** import graphql iso-date-type module */
const {GraphQLDateTime} = require("graphql-iso-date");
/** import public types */
const {UserType} = require("./public.types");

/**
 * define parent comment type
 */
const CommentAnswerType = new GraphQLObjectType({
    name: "parentCommentType",
    fields: {
        _id: {type: GraphQLString},
        user: {type: UserType},
        comment: {type: GraphQLString},
        visibility: {type: GraphQLBoolean},
        createdAt: {type: GraphQLDateTime},
        updatedAt: {type: GraphQLDateTime},
    }
});

/**
 * define comment type
 */
const CommentType = new GraphQLObjectType({
    name: "commentType",
    fields: {
        _id: {type: GraphQLString},
        user: {type: UserType},
        comment: {type: GraphQLString},
        visibility: {type: GraphQLBoolean},
        openToComment: {type: GraphQLBoolean},
        answers: {type: new GraphQLList(CommentAnswerType)},
        createdAt: {type: GraphQLDateTime},
        updatedAt: {type: GraphQLDateTime},
    }
});

/**
 * define comments list type
 */
const CommentsListType = new GraphQLList(CommentType);

module.exports = {
    CommentType,
    CommentsListType
}