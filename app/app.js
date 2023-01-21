/** import express module */
const express = require("express");

/**
 * Application main config class
 */
module.exports = class Application {
    /**
     * create an app instance from express
     * @type {*|Express}
     */
    #app = express();
    /** application port number */
    #PORT;
    /** application mongodb connection string */
    #DB_URI;

    /**
     * application main class contractor
     * @param PORT application port number
     * @param DB_URI application mongodb connection string
     */
    constructor(PORT, DB_URI) {
        /** set application port number */
        this.#PORT = PORT;
        /** set application mongodb connection string */
        this.#DB_URI = DB_URI;
        /** initialize application configuration method */
        this.applicationConfiguration();
        /** initialize mongodb configuration method */
        this.mongodbConnection();
        /** initialize server creation method */
        this.createServer();
        /** initialize route creation method */
        this.createRoutes();
        /** initialize error handler */
        this.errorHandler();
    }

    /**
     * application config method
     */
    applicationConfiguration() {
        /** import path module */
        const path = require("path");

        /** initialize express json body parser */
        this.#app.use(express.json());
        /** initialize express urlencoded body parser */
        this.#app.use(express.urlencoded({extended: true}));
        /** initialize express statics */
        this.#app.use(express.static(path.resolve("./public")));

    }

    /**
     * application server creator
     */
    createServer() {
        /** import http module */
        const http = require("http");
        /** create http server */
        const server = http.createServer(this.#app);
        /** run server */
        server.listen(this.#PORT, () => {
            console.log(`running > http://localhost:${this.#PORT}`, `time: ${new Date()}`);
        });
    }

    /**
     * application mongodb connection config
     */
    mongodbConnection() {
        /** import mongoose module */
        const {default: mongoose} = require('mongoose');

        /** set mongoose strictQuery option */
        mongoose.set('strictQuery', false);

        /** create database connection */
        mongoose.connect(this.#DB_URI, (err) => {
            /** throw error if there was any */
            if (err) throw err;

            console.log("database connected successfully");
        });
    }

    /**
     * application routers initializer
     */
    createRoutes() {
        /** import system main router */
        const {mainRouter} = require("app/router/router");
        /** initialize system main router */
        this.#app.use(mainRouter);
    }

    /**
     * application error handler
     */
    errorHandler() {
        /**
         * 404 page not found error handler
         */
        this.#app.use((req, res, next) => {
            /** return 404 error */
            return res.status(404).json({
                status: 404,
                success: false,
                message: "آدرس مورد نظر شما یافت نشد"
            });
        });

        /**
         * system error handler
         */
        this.#app.use((error, req, res, next) => {
            /**
             * define error status
             * @type {*|number}
             */
            const status = error?.status || 500;
            /**
             * define error message
             * @type {*|string}
             */
            const message = error?.message || "Internal server error";

            /** log the error in console */
            console.error(error);

            /** return error */
            return res.status(status).json({
                status,
                success: false,
                message,
            });
        });
    }
}