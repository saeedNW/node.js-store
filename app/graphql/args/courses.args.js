/** import graphql */
const {GraphQLString} = require("graphql");

/**
 * define course objectId argument
 */
const CourseId = {
    courseId: {type: GraphQLString},
}

/**
 * define category objectId argument
 */
const CategoryId = {
    categoryId: {type: GraphQLString},
}

module.exports = {
    CourseId,
    CategoryId
}