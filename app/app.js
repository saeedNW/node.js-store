/**
 * Application main config class
 */
module.exports = class Application {
    /**
     * import express module
     */
    #express = require("express");
    /**
     * create an app instance from express
     * @type {*|Express}
     */
    #app = this.#express();
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
        /** print application runtime environment */
        console.log(`application running in ${process.env.NODE_ENV} environment`);
        /** initialize application configuration method */
        this.applicationConfiguration();
        /** initialize application swagger configuration method */
        this.applicationSwaggerConfiguration();
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
        /** import morgan module */
        const morgan = require('morgan');
        /** import cors module */
        const cors = require("cors");

        /** initialize morgan for dev environment */
        if (process.env.NODE_ENV === 'development')
            this.#app.use(morgan('dev'));

        /** initialize cors module */
        this.#app.use(cors());
        /** initialize express json body parser */
        this.#app.use(this.#express.json());
        /** initialize express urlencoded body parser */
        this.#app.use(this.#express.urlencoded({extended: true}));
        /** initialize express statics */
        this.#app.use(this.#express.static(path.resolve("./public")));
    }

    /**
     * application swagger configuration
     */
    applicationSwaggerConfiguration() {
        /** import swagger ui express module */
        const swaggerUi = require("swagger-ui-express");
        /** import swagger jsdoc module */
        const swaggerJsDoc = require("swagger-jsdoc");

        this.#app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc({
            swaggerDefinition: {
                info: {
                    title: "node.js store",
                    version: "1.0.0",
                    description: "node.js store project",
                    contact: {
                        name: "Saeed Norouzi",
                        url: "https://codding.ir",
                        email: "saeednorouzi98@gmail.com"
                    }
                },
                servers: [
                    {
                        url: "http://localhost:3000"
                    }
                ]
            },
            apis: ['app/router/**/**.js'],
        })));
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

        mongoose.connection.on("disconnect", () => {
            console.log("database disconnect successfully");
        });

        /**
         * close mongodb connection
         */
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("database connection closed successfully");
            process.exit(0);
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
        /** import http-error module */
        const createError = require("http-errors");

        /**
         * 404 page not found error handler
         */
        this.#app.use((req, res, next) => {
            next(createError.NotFound("آدرس مورد نظر شما یافت نشد"));
        });

        /**
         * system error handler
         */
        this.#app.use((error, req, res, next) => {
            /**
             * define server internal error
             */
            const serverError = createError.InternalServerError();

            /**
             * define error status
             * @type {*|number}
             */
            const status = error?.status || serverError.status;

            /**
             * define error message
             * @type {*|string}
             */
            const message = error?.message || serverError.message;

            /** log the error in console */
            console.error(error);

            /** return error */
            return res.status(status).json({
                status,
                success: false,
                errors: message
            });
        });
    }
}