const permissionsFeed = Object.freeze([
    /** super admin full permissions */
    {
        "title": "full-access",
        "label": "ادمین کل"
    },
    /** blog permissions */
    {
        "title": "show-blogs",
        "label": "نمایش بلاگ ها"
    }, {
        "title": "add-blogs",
        "label": "افزودن بلاگ"
    }, {
        "title": "single-blog",
        "label": "نمایش یک بلاگ"
    }, {
        "title": "remove-blogs",
        "label": "حذف بلاگ"
    }, {
        "title": "edit-blogs",
        "label": "ویرایش بلاگ"
    },
    /** category permissions */
    {
        "title": "add-categories",
        "label": "افزودن دسته بندی"
    }, {
        "title": "remove-categories",
        "label": "حذف دسته بندی"
    }, {
        "title": "show-categories",
        "label": "نمایش دسته بندی ها"
    }, {
        "title": "single-category",
        "label": "نمایش یک دسته بندی"
    }, {
        "title": "show-children-categories",
        "label": "نمایش دسته بندی های فرزند"
    }, {
        "title": "show-parents-categories",
        "label": "نمایش دسته بندی های والد"
    },
]);

module.exports = {
    permissionsFeed
}