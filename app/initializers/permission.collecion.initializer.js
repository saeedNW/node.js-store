/** import permissions feed */
const {permissionsFeed} = require("./feed/permissions");
/** import permission model */
const {permissionsModel} = require("app/models");

/**
 * permission collection initializer
 */
const permissionsInitializer = async () => {
    try {
        /** loop over permissions list */
        for (const permission of permissionsFeed) {
            /** check permission existence */
            const permissionExists = await permissionsModel.findOne({title: permission.title});

            /** create permission in database if it wasn't found */
            if (!permissionExists) await permissionsModel.create(permission);
        }
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    permissionsInitializer
}