const adminEpisodeRouter = require("express").Router();
/** import admin chapter controller */
const {AdminEpisodeController} = require("app/http/controllers/admin/course/admin.episode.controller");
/** import multer video uploader */
const { uploadVideo } = require("app/utils/multer");

adminEpisodeRouter.post("/new", uploadVideo.single("video"), AdminEpisodeController.addNewEpisode)

module.exports = {
    adminEpisodeRouter
}