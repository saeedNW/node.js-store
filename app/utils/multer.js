/** import multer module */
const multer = require("multer");
/** import path module */
const path = require("path");
/** import file system module */
const fs = require("fs");
/** import http-error module */
const createError = require("http-errors");

/** multer storage configuration */
const storage = multer.diskStorage({
    /**
     * uploaded file destination
     * @param req express request
     * @param file uploaded file
     * @param cb callback
     */
    destination: (req, file, cb) => {
        /** create and return file path if file was uploaded */
        if (file?.originalname)
            return cb(null, createUploadPath(req));

        return cb(null, null);
    },
    /**
     * uploaded file name creator
     * @param req express request
     * @param file uploaded file
     * @param cb callback
     */
    filename: (req, file, cb) => {
        /** create and return file path if file was uploaded */
        if (file?.originalname) {
            /**
             * get file type
             * @type {string}
             */
            const type = path.extname(file?.originalname || "");
            /**
             * define file name
             * @type {string}
             */
            const fileName = String(Date.now() + type);

            /** set file name in request body */
            req.body.fileName = fileName;

           return cb(null, fileName);
        }

        return cb(null, null);

    }
});

/** multer file filter */
function fileFilter(req, file, cb) {
    /**
     * get file type extension
     * @type {string}
     */
    const fileExt = path.extname(file.originalname);

    /**
     * define file valid mimetypes
     * @type {string[]}
     */
    const validMimetypes = [".jpg", ".png", ".jpeg", ".gif", ".webp"];

    if (!validMimetypes.includes(fileExt))
        return cb(new createError.UnprocessableEntity("تصویر ارسال شده صحیح نمیباشد"));

    return cb(null, true);
}

/**
 * create uploaded file path
 * @param req
 * @returns {*}
 */
function createUploadPath(req) {
    /**
     * get current date
     * @type {Date}
     */
    let d = new Date();

    /**
     * get current year
     * @type {string}
     */
    const Year = "" + d.getFullYear();

    /**
     * get current month
     * @type {string}
     */
    const Month = d.getMonth() + 1 + "";

    /**
     * get current day
     * @type {string}
     */
    const day = "" + d.getDate();

    /**
     * define upload path
     * @type {string}
     */
    const uploadPath = path.join(__dirname, "..", "..", "public", "upload", Year, Month, day);

    /** set file path in request body */
    req.body.fileUploadPath = path.join("upload", Year, Month, day)

    /**
     * create upload path if doesn't exist
     */
    fs.mkdirSync(uploadPath, {recursive: true});

    /**
     * return upload path
     */
    return path.join("public", "upload", Year, Month, day);
}


/** create multer uploader with defined storage configuration */
const uploadFile = multer({storage, fileFilter});

module.exports = {
    uploadFile
}