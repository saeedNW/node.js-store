/** define admin episodes router */
const adminEpisodeRouter = require("express").Router();
/** import admin episodes controller */
const {AdminEpisodeController} = require("app/http/controllers/admin/course/admin.episode.controller");
/** import multer video uploader */
const { uploadVideo } = require("app/utils/multer");

adminEpisodeRouter.post("/new", uploadVideo.single("video"), AdminEpisodeController.addNewEpisode);

adminEpisodeRouter.delete("/remove/:episodeId", AdminEpisodeController.removeEpisode);

adminEpisodeRouter.patch("/update/:episodeId", uploadVideo.single("video"), AdminEpisodeController.updateEpisode)

module.exports = {
    adminEpisodeRouter
}