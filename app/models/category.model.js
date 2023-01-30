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
    parent: {
        type: mongoose.Types.ObjectId,
        default: undefined,
        ref: "category"
    }
}, {
    /** activate timestamp (createdAt/updatedAt) */
    timestamps: true,
    /** activate virtuals */
    toJSON: {virtuals: true},
    /** remove external id option */
    id: false,
});

/** define schema virtual */
Schema.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
});

/**
 * auto populate function
 * @param next
 */
function autoPopulate(next) {
    this.populate({path: "children", select: {__v: 0}});
    next();
}

/** define schema pre find and findOne method */
Schema.pre("findOne", autoPopulate).pre("find", autoPopulate);

/**
 * create mongoose model from the schema
 */
const categoryModel = mongoose.model("category", Schema);

/** export schema */
module.exports = {
    categoryModel
}