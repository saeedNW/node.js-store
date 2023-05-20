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
/** import mongodb object id validator */
const {ObjectIdValidator} = require("app/http/validators/public/public.schema");

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

    /**
     * remove an episode
     * @param req express request
     * @param res express response
     * @param next express next function
     * @returns {Promise<*>}
     */
    async removeEpisode(req, res, next) {
        try {
            /** check if the episode id is a valid mongodb object id */
            const {id: episodeId} = await ObjectIdValidator.validateAsync({id: req.params.episodeId});

            /** get episode data */
            await this.getOneEpisode(episodeId);

            /** remove episode from database */
            const removedEpisode = await courseModel.updateOne({
                "chapters.episodes._id": episodeId,
            }, {
                $pull: {
                    "chapters.$.episodes": {
                        _id: episodeId
                    }
                }
            });

            /** return error if the episode was not removed */
            if (removedEpisode.modifiedCount <= 0) throw new createError.InternalServerError("حذف اپیزود با مشکل مواجه شد، لطفا مجددا تلاش نمایید");

            /** return the success message */
            return this.sendSuccessResponse(req, res, httpStatus.OK, 'حذف اپیزود با موفقیت انجام شد');
        } catch (error) {
            next(error)
        }
    }

    /**
     * get an episode with object id
     * @param episodeId episode object id
     * @returns {Promise<*>}
     */
    async getOneEpisode(episodeId) {
        /** get episode data from database */
        const course = await courseModel.findOne({"chapters.episodes._id": episodeId}, {
            "chapters.$.episodes": 1
        });

        /** return error if the episode was not found */
        if (!course) throw new createError.NotFound("اپیزود انتخابی یافت یافت نشد");

        /** change database search result structure */
        const episode = await course?.chapters?.[0]?.episodes?.[0];

        /** return error if the episode was not found */
        if (!episode) throw new createError.NotFound("اپیزود انتخابی یافت یافت نشد");

        /** return episode data */
        return copyObject(episode)
    }
}

module.exports = {
    AdminEpisodeController: new AdminEpisodeController()
}