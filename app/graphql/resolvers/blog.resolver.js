/** import models */
const {blogModel} = require("app/models");

/**
 * define blog resolver
 */
const BlogResolver = async () => {
    return blogModel.findOne({}).populate([{path: 'author'}, {path: 'category'}]);
}

/**
 * define blogs list resolver
 */
const BlogsListResolver = async () => {
    return blogModel.find({}).populate([{path: 'author'}, {path: 'category'}]);
}

module.exports = {
    BlogResolver,
    BlogsListResolver
}