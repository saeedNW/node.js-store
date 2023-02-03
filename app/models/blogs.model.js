/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define comments schema
 */
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        default: undefined,
        ref: "comment"
    }
}, {
    /** activate timestamp (createdAt/updatedAt) */
    timestamps: true,
    /** activate virtuals */
    toJSON: {virtuals: true},
    /** remove external id option */
    id: false,
    /** remove version key */
    versionKey: false
});

/**
 * define blogs schema
 */
const Schema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
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
        required: true
    },
    comments: {
        type: [commentSchema],
        default: []
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        ref: "users",
        default: []
    },
    dislike: {
        type: [mongoose.Types.ObjectId],
        ref: "users",
        default: []
    },
    bookmark: {
        type: [mongoose.Types.ObjectId],
        ref: "users",
        default: []
    },
}, {
    timestamps: true
});

/**
 * create mongoose model from the schema
 */
const blogModel = mongoose.model("blog", Schema);

/** export schema */
module.exports = {
    blogModel
}