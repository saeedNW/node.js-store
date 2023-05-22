/** import permission constants */
const {permissionConstants} = require("app/utils/constans");
/** import http-error module */
const createError = require("http-errors");

/**
 * check if user has a required role for accessing to the route
 * @param {[]} requiredPermissions required permissions for accessing to the route
 * @returns {(function(*, *, *): Promise<*|undefined>)|*}
 */
function permissionGuard(requiredPermissions = []) {
    return async (req, res, next) => {
        try {
            /**
             * get user info from request.
             * populate with user roles
             */
            const user = await req.user.populate({
                path: "adminRole",
                /**
                 * populate roles with role permissions
                 */
                populate: {
                    path: "permissions"
                }
            });

            /**
             * throw error if user doesn't have any roles
             */
            if (!user.adminRole) throw new createError.Forbidden("شما اجازه دسترسی به این بخش را ندارید");

            /**
             * get user access permissions title as an array
             * @type {*[]}
             */
            const userPermissions = user.adminRole.permissions.map(permission => permission.title);

            /**
             * check if user has the required permission
             * @type {boolean[]}
             */
            const hashPermission = requiredPermissions.map(permission => {
                return userPermissions.includes(permission);
            });

            /**
             * let user access to the route if he has full access
             */
            if (userPermissions.includes(permissionConstants.fullAccess)) return next();

            /**
             * let user access to the route if
             * he has the required permission
             * or if the route didn't require any
             * permission to gain access to it
             */
            if (requiredPermissions.length === 0 || hashPermission.includes(true)) return next();

            /**
             * throw error if user doesn't have the required permission
             */
            throw new createError.Forbidden("شما اجازه دسترسی به این بخش را ندارید");
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    permissionGuard
}