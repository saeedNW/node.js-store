/** import blogs types */
const {BlogsListType} = require("app/graphql/types/blogs.types");
/** import user profile resolver */
const {UserBookmarkedBlogsResolver} = require("app/graphql/resolvers/user.profile.resolver");

/**
 * define user bookmarked blogs query
 */
const UserBookmarkedBlogsQuery = {
    type: BlogsListType,
    resolve: UserBookmarkedBlogsResolver
}

module.exports={
    UserBookmarkedBlogsQuery,
}