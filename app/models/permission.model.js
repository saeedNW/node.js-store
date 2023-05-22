/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define permissions collection schema
 */
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    label: {
        type: String,
        required: true,
        unique: true
    },
}, {
    /** activate timestamp (createdAt/updatedAt) */
    timestamps: true,
    /** activate virtual */
    toJSON: {virtuals: true},
    /** remove external id option */
    id: false,
});

/** define virtual field for roles */
Schema.virtual("roles", {
    ref: "role",
    localField: "_id",
    foreignField: "permissions",
});

/**
 * create mongoose model from the schema
 */
const permissionsModel = mongoose.model("permission", Schema);

/** export schema */
module.exports = {
    permissionsModel
}