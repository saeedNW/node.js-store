/** import graphql */
const {GraphQLObjectType, GraphQLSchema} = require("graphql");
/** import queries */
const {
    BlogsListQuery, BlogQuery,
    ProductsListQuery, ProductQuery,
    CoursesListQuery, CourseQuery,
    CategoryQuery, CategoriesListQuery,
    ParentCategoriesList, ChildCategoriesList,
    UserBookmarkedBlogsQuery, UserBookmarkedCoursesQuery,
} = require("./queries");
/** import mutations */
const {
    BlogCommentCreationMutation, CourseCommentCreationMutation,
    ProductCommentCreationMutation, ProductLikeMutation,
    BlogLikeMutation, CourseLikeMutation,
    BlogDislikeMutation, CourseDislikeMutation,
    ProductDislikeMutation, BlogBookmarkMutation,
    CourseBookmarkMutation, ProductBookmarkMutation
} = require("./mutations");

/**
 * define graphql root query
 * @type {GraphQLObjectType<any, any>}
 */
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blog: BlogQuery,
        blogs: BlogsListQuery,
        product: ProductQuery,
        products: ProductsListQuery,
        course: CourseQuery,
        courses: CoursesListQuery,
        category: CategoryQuery,
        categories: CategoriesListQuery,
        parentCategories: ParentCategoriesList,
        childCategories: ChildCategoriesList,
        getUserBookmarkedBlogs: UserBookmarkedBlogsQuery,
        getUserBookmarkedCourses: UserBookmarkedCoursesQuery,
    }
});

/**
 * define graphql root mutations
 * @type {GraphQLObjectType<any, any>}
 */
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        blogCommentCreation: BlogCommentCreationMutation,
        courseCommentCreation: CourseCommentCreationMutation,
        productCommentCreation: ProductCommentCreationMutation,
        likeProduct: ProductLikeMutation,
        likeBlog: BlogLikeMutation,
        likeCourse: CourseLikeMutation,
        dislikeBlog: BlogDislikeMutation,
        dislikeCourse: CourseDislikeMutation,
        dislikeProduct: ProductDislikeMutation,
        blogBookmark: BlogBookmarkMutation,
        courseBookmark: CourseBookmarkMutation,
        productBookmark: ProductBookmarkMutation,
    }
});

/**
 * define graphql custom schema
 * @type {GraphQLSchema}
 */
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

module.exports = {
    graphQLSchema
}