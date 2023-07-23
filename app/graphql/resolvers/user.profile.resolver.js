/** import graphql access verification */
const {graphqlAccessTokenVerification} = require("app/http/middlewares/verify.access.token.middleware");
/** import models */
const {blogModel} = require("app/models");
/** import mongoose */
const {default: mongoose} = require("mongoose");

/**
 * define users bookmarked blogs resolver
 */
const UserBookmarkedBlogsResolver = async (_, args, context) => {
    /**
     * initialize user access verification.
     * get user data
     */
    const user = await graphqlAccessTokenVerification(context);

    /** get user bookmarked blogs */
    return blogModel.find({bookmarks: user._id}).populate([
        {path: 'author'},
        {path: 'category'},
        {path: 'comments.user'},
        {path: 'comments.answers.user'},
        {path: 'likes'},
        {path: 'dislikes'},
        {path: 'bookmarks'},
    ]);
}

module.exports = {
    UserBookmarkedBlogsResolver,
}