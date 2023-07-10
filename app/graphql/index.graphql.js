/** import graphql */
const {GraphQLObjectType, GraphQLSchema} = require("graphql");
/** import blog query */
const {BlogsListQuery, BlogQuery} = require("./queries/blogs.query");
/** import products queries */
const {ProductsListQuery, ProductQuery} = require("./queries/products.query");
/** import products queries */
const {CoursesListQuery, CourseQuery} = require("./queries/courses.query");
/** import categories queries */
const {
    CategoryQuery,
    CategoriesListQuery,
    ParentCategoriesList,
    ChildCategoriesList
} = require("./queries/categories.query");

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
    }
});

/**
 * define graphql root mutations
 * @type {GraphQLObjectType<any, any>}
 */
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {}
});

/**
 * define graphql custom schema
 * @type {GraphQLSchema}
 */
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation
});

module.exports = {
    graphQLSchema
}