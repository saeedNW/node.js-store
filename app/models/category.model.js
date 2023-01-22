/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define blogs schema
 */
const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

/**
 * create mongoose model from the schema
 */
const categoryModel = mongoose.model("category", Schema);

/** export schema */
module.exports = {
    categoryModel
}