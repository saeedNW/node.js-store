/** import main controller */
const Controller = require("app/http/controllers/controller");
/** import models */
const {userModel} = require("app/models");
/** import helper functions */
const {signAccessToken} = require("app/utils/functions");

/**
 * Application support controller
 */
class SupportController extends Controller {
    /**
     * render chat room page
     * @param {object} req - express request object
     * @param {object} res - express response object
     * @param next express next function
     * @returns {Promise<void>}
     */
    async renderChatRoom(req, res, next) {
        try {
            return res.render('pages/chat');
        } catch (err) {
            next(err);
        }
    }

    /**
     * render login page
     * @param {object} req - express request object
     * @param {object} res - express response object
     * @param next express next function
     * @returns {Promise<void>}
     */
    async loginPage(req, res, next) {
        try {
            return res.render("pages/login", {
                error: undefined
            })
        } catch (err) {
            next(err);
        }
    }

    /**
     * login process handler
     * @param {object} req - express request object
     * @param {object} res - express response object
     * @param next express next function
     * @returns {Promise<void>}
     */
    async loginHandler(req, res, next) {
        try {
            /** extract phone number from request body */
            const {phone} = req.body;


            /** retrieve user data from database */
            const user = await userModel.findOne({phone});

            /**
             * render login page if the user was not found
             * send an error which decline that the phone wasn't valid
             */
            if (!user) {
                return res.render("pages/login", {
                    error: "اطلاعات ورودی دارای مشکل می باشند"
                })
            }

            /**
             * create user access token
             * @type {*}
             */
            const token = await signAccessToken(user._id);

            /**
             * set access token in user browser cookies
             * set the cookie's expiration date for one day
             */
            res.cookie("authorization", token, {
                signed: true,
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
            })

            /** update user access token in database */
            user.token = token;
            user.save();

            /** redirect user tto support page */
            return res.redirect("/support");
        } catch (err) {
            next(err);
        }
    }
}

module.exports = {
    SupportController: new SupportController()
}