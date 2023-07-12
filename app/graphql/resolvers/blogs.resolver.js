/** import models */
const {blogModel} = require("app/models");
/** import graphql access verification */
const {graphqlAccessTokenVerification} = require("app/http/middlewares/verify.access.token.middleware");

/**
 * define blog resolver
 */
const BlogResolver = async (_, args, context) => {
    /** initialize user access verification */
    await graphqlAccessTokenVerification(context);
    /** extract blog id from args */
    const {blogId} = args;
    /** get blog data from database */
    return blogModel.findOne({_id: blogId}).populate([
        {path: 'author'},
        {path: 'category'},
        {path: 'comments.user'},
        {path: 'comments.answers.user'},
    ]);
}

/**
 * define blogs list resolver
 */
const BlogsListResolver = async (_, args, context) => {
    /** initialize user access verification */
    await graphqlAccessTokenVerification(context);
    /** get blogs data from database */
    return blogModel.find({}).populate([
        {path: 'author'},
        {path: 'category'},
        {path: 'comments.user'},
        {path: 'comments.answers.user'},
    ]);
}

module.exports = {
    BlogResolver,
    BlogsListResolver
}