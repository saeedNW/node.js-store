/** import models */
const {courseModel} = require("app/models");
/** import graphql access verification */
const {graphqlAccessTokenVerification} = require("app/http/middlewares/verify.access.token.middleware");

/**
 * define course resolver
 */
const CourseResolver = async (_, args, context) => {
    /** initialize user access verification */
    await graphqlAccessTokenVerification(context);
    /** extract course id from args */
    const {courseId} = args;
    /** get course data */
    return courseModel.findOne({_id: courseId}).populate([
        {path: 'mentor'},
        {path: 'category'},
        {path: 'comments.user'},
        {path: 'comments.answers.user'},
    ]);
}

/**
 * define courses list resolver
 */
const CoursesListResolver = async (_, args, context) => {
    /** initialize user access verification */
    await graphqlAccessTokenVerification(context);
    /** extract category id from args (filter) */
    const {categoryId: category} = args;
    /** define search query */
    const searchQuery = category ? {category} : {}
    /** get courses data */
    return courseModel.find(searchQuery).populate([
        {path: 'mentor'},
        {path: 'category'},
        {path: 'comments.user'},
        {path: 'comments.answers.user'},
    ]);
}

module.exports = {
    CourseResolver,
    CoursesListResolver
}