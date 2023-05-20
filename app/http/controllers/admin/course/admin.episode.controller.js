/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import get video duration module */
const {getVideoDurationInSeconds} = require("get-video-duration");
/** import episode validator */
const {createEpisodeSchema} = require("app/http/validators/admin/admin.episode.schema");
/** import path module */
const path = require("path");
/** import helper functions */
const {copyObject, removeFile, deleteInvalidPropertyInObject, getTime} = require("app/utils/functions");
/** import models */
const {courseModel} = require("app/models");
/** import http-error module */
const createError = require("http-errors");
/** import http status codes module */
const httpStatus = require("http-status-codes");
/** import file system module */
const fs = require('fs')

/**
 * @class AdminEpisodeController
 */
class AdminEpisodeController extends Controller {
    /**
     * add new episode process
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<void>}
     */
    async addNewEpisode(req, res, next) {
        try {
            /** validate user inputs */
            const {
                title, description, type, chapterId,
                courseId, fileName, fileUploadPath
            } = await createEpisodeSchema.validateAsync(req.body);

            /** get video file absolute location (address) */
            const fileAddress = path.join(fileUploadPath, fileName);

            /** convert video address and replace all of "\" with "/" */
            const videoAddress = `/${fileAddress.replace(/\\/g, "/")}`;

            /** read video file */
            const stream = fs.createReadStream(path.resolve(`./public${videoAddress}`))

            /** get video file duration in seconds */
            const seconds = await getVideoDurationInSeconds(stream);

            /** convert video duration to full hour format */
            const time = getTime(seconds);

            /** create episode data object */
            const episode = {
                title, description, type,
                time, videoAddress
            };

            /** save episode data in data base */
            const createEpisodeResult = await courseModel.updateOne({
                '_id': courseId,
                "chapters._id": chapterId
            }, {
                $push: {
                    /**
                     * this query means to make changes to the result of the find query above.
                     * add, remove or edit episodes of the chapter that has been found.
                     */
                    "chapters.$.episodes": episode
                }
            });

            /** return error if update was unsuccessful */
            if (createEpisodeResult.modifiedCount <= 0) throw new createError.InternalServerError("افزودن اپیزود با شکست مواجه شد. لطفا مجددا تلاش نمایید");

            /** send the success message */
            return this.sendSuccessResponse(req, res, httpStatus.OK, 'اپیزود با موفقیت افزوده شد');
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
}

module.exports = {
    AdminEpisodeController: new AdminEpisodeController()
}