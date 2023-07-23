/** import graphql access verification */
const {graphqlAccessTokenVerification} = require("app/http/middlewares/verify.access.token.middleware");
/** import models */
const {blogModel, courseModel, productModel} = require("app/models");
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

/**
 * define users bookmarked courses resolver
 */
const UserBookmarkedCoursesResolver = async (_, args, context) => {
    /**
     * initialize user access verification.
     * get user data
     */
    const user = await graphqlAccessTokenVerification(context);

    /** get user bookmarked courses */
    return courseModel.find({bookmarks: user._id}).populate([
        {path: 'category'},
        {path: 'likes'},
        {path: 'dislikes'},
        {path: 'bookmarks'},
        {path: 'comments.user'},
        {path: 'comments.answers.user'},
        {path: 'mentor'},
    ]);
}

/**
 * define users bookmarked products resolver
 */
const UserBookmarkedProductsResolver = async (_, args, context) => {
    /**
     * initialize user access verification.
     * get user data
     */
    const user = await graphqlAccessTokenVerification(context);

    /** get user bookmarked products */
    return productModel.find({bookmarks: user._id}).populate([
        {path: 'category'},
        {path: 'comments.user'},
        {path: 'comments.answers.user'},
        {path: 'likes'},
        {path: 'dislikes'},
        {path: 'bookmarks'},
        {path: 'supplier'},
    ]);
}

module.exports = {
    UserBookmarkedBlogsResolver,
    UserBookmarkedCoursesResolver,
    UserBookmarkedProductsResolver,
}