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

module.exports = {
    commentSchema
}