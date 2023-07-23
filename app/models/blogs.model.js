/** import mongoose module */
const {default: mongoose} = require("mongoose");
/** import comment schema */
const {commentSchema} = require("./schemas/comments.schema");

/**
 * define blogs schema
 */
const Schema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category",
        required: true
    },
    comments: {
        type: [commentSchema],
        default: []
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        ref: "user",
        default: []
    },
    dislikes: {
        type: [mongoose.Types.ObjectId],
        ref: "user",
        default: []
    },
    bookmarks: {
        type: [mongoose.Types.ObjectId],
        ref: "user",
        default: []
    },
}, {
    timestamps: true,
    /** activate virtuals */
    toJSON: {virtuals: true},
    /** remove external id option */
    id: false,
});

/**
 * create mongoose model from the schema
 */
const blogModel = mongoose.model("blog", Schema);

/** export schema */
module.exports = {
    blogModel
}