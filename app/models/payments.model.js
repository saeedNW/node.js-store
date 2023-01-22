/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define blogs schema
 */
const Schema = new mongoose.Schema({}, {
    timestamps: true
});

/**
 * create mongoose model from the schema
 */
const paymentModel = mongoose.model("payment", Schema);

/** export schema */
module.exports = {
    paymentModel
}