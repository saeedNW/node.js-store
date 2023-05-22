/** import mongoose module */
const {default: mongoose} = require("mongoose");

/**
 * define role collection schema
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
    permissions: [{
        type: mongoose.Types.ObjectId,
        ref: 'permission',
        required: true
    }]
}, {
    /** activate timestamp (createdAt/updatedAt) */
    timestamps: true,
    /** activate virtual */
    toJSON: {virtuals: true},
    /** remove external id option */
    id: false,
});

/**
 * create mongoose model from the schema
 */
const rolesModel = mongoose.model("role", Schema);

/** export schema */
module.exports = {
    rolesModel
}