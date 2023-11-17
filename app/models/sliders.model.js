/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define slider schema
 */
const Schema = new mongoose.Schema({
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: "main"
    },
}, {
    timestamps: true
});

/**
 * create mongoose model from the schema
 */
const sliderModel = mongoose.model("slider", Schema);

/** export schema */
module.exports = {
    sliderModel
}