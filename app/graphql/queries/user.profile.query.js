/** import blogs types */
const {BlogsListType} = require("app/graphql/types/blogs.types");
/** import courses types */
const {CoursesListType} = require("app/graphql/types/courses.types");
/** import products types */
const {ProductsListType} = require("app/graphql/types/products.types");
/** import user profile resolver */
const {
    UserBookmarkedBlogsResolver,
    UserBookmarkedCoursesResolver,
    UserBookmarkedProductsResolver
} = require("app/graphql/resolvers/user.profile.resolver");

/**
 * define user bookmarked blogs query
 */
const UserBookmarkedBlogsQuery = {
    type: BlogsListType,
    resolve: UserBookmarkedBlogsResolver
}

/**
 * define user bookmarked courses query
 */
const UserBookmarkedCoursesQuery = {
    type: CoursesListType,
    resolve: UserBookmarkedCoursesResolver
}

/**
 * define user bookmarked products query
 */
const UserBookmarkedProductsQuery = {
    type: ProductsListType,
    resolve: UserBookmarkedProductsResolver
}

module.exports = {
    UserBookmarkedBlogsQuery,
    UserBookmarkedCoursesQuery,
    UserBookmarkedProductsQuery,
}