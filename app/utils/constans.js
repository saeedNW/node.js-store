const userConstants = Object.freeze({
    UserRoles: {
        USER: "USER",
        ADMIN: "ADMIN",
        WRITER: "WRITER",
        MENTOR: "MENTOR",
        SUPPLIER: "SUPPLIER"
    }
});

const JWTConstants = Object.freeze({
    ACCESS_TOKEN_SECRET_KEY: "a5f1d82be76f47bbd7f238a331b9fbf3e4f51c7aefeab3b261c9c62376a7a532",
    REFRESH_TOKEN_SECRET_KEY: "0e7833c5ebd97d67b2db372e604a9d5d467824d250b78e61370b678eeb7a336a",
});

const mongodbConstants = Object.freeze({
    MongoIdPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
});

const permissionConstants = Object.freeze({
    /** super admin full permissions */
    fullAccess: "full-access",
    /** blog permissions */
    showBlogs: "show-blogs",
    addBlogs: "add-blogs",
    singleBlog: "single-blog",
    removeBlogs: "remove-blogs",
    editBlogs: "edit-blogs",
    /** category permissions */
    addCategories: "add-categories",
    removeCategories: "remove-categories",
    showCategories: "show-categories",
    showParentsCategories: "show-parents-categories",
    showChildrenCategories: "show-children-categories",
    singleCategory: "single-category",
});

module.exports = {
    userConstants,
    JWTConstants,
    mongodbConstants,
    permissionConstants,
}