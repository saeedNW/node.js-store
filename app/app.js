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
        /** initialize client session */
        this.initClientSession();
        /** initialize application template engine */
        this.templateEngineInitializer();
        /** initialize application swagger configuration method */
        this.applicationSwaggerConfiguration();
        /** initialize mongodb configuration method */
        this.mongodbConnection();
        /** initialized redis configuration method */
        this.redisConnection();
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

    initClientSession() {
        /** import cookie parser module */
        const cookieParser = require('cookie-parser');
        /** import express session module */
        const session = require('express-session');

        /** initialize cookie parser module */
        this.#app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY));

        /** initialize express session */
        this.#app.use(session({
            secret: process.env.COOKIE_PARSER_SECRET_KEY,
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
        }));
    }

    /**
     * application swagger configuration
     */
    applicationSwaggerConfiguration() {
        /** import swagger ui express module */
        const swaggerUi = require("swagger-ui-express");
        /** import swagger jsdoc module */
        const swaggerJsDoc = require("swagger-jsdoc");

        this.#app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(
            swaggerJsDoc({
                swaggerDefinition: {
                    openapi: "3.0.0",
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
                    ],
                    components: {
                        securitySchemes: {
                            BearerAuth: {
                                type: "http",
                                scheme: "bearer",
                                bearerFormat: "JWT"
                            }
                        }
                    },
                    security: [{BearerAuth: []}]
                },
                apis: ['app/router/**/**.js'],
            }),
            {explorer: true}
        ));
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
        mongoose.connect(this.#DB_URI, async (err) => {
            /** throw error if there was any */
            if (err) throw err;

            /** call system database initializer */
            await this.systemDatabaseCollectionInitializer();

            console.log("MongoDB connected successfully");
        });

        mongoose.connection.on("disconnect", () => {
            console.log("MongoDB disconnected successfully");
        });

        /**
         * close mongodb connection
         */
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("MongoDB connection closed successfully");
            process.exit(0);
        });
    }

    /**
     * application redis database connection config
     */
    redisConnection() {
        /** import and initialize redis config */
        const redisClient = require("app/utils/init.redis");

        /** test redis database connection */
        (async () => {
            await redisClient.set("name", "saeed norouzi");
            const value = await redisClient.get("name");
            console.log(value)
        })()
    }

    templateEngineInitializer() {
        /** import express-ejs-layouts module */
        const expressLayouts = require("express-ejs-layouts");
        /** import path module */
        const path = require("path");
        /** import client global ejs variables handler */
        const {clientHelper} = require("app/utils/client");

        /** initialize express-ejs-layouts */
        this.#app.use(expressLayouts);

        /** initialize View Engine */
        this.#app.set("view engine", "ejs");

        /** set view files location */
        this.#app.set("views", path.resolve("./resource/views"));

        /**
         * enable express-ejs-layouts extractScripts feature.
         * this feature will extract all html "script" tags and put them at the defined location in the layout.
         */
        this.#app.set("layout extractScripts", true);

        /**
         * enable express-ejs-layouts extractStyles feature.
         * this feature will extract all html "style" tags and put them at the defined location in the layout.
         */
        this.#app.set("layout extractStyles", true);

        /**
         * define main layout file location
         * Note.1: default layout.ejs file should be in view files directory,
         * so if you plan to put them in a subdirectory like "views/layouts",
         * you should change default layout setting using "layout" middleware.
         * Note.2: for changing layout default setting the path should be started from
         * view files directory which in this case it should be "./layouts/main_layout".
         * Note.3: you can also define and change layout for specific pages during page
         * render process with "layout" option.
         */
        this.#app.set("layout", "./layouts/layout");

        /** initialize view engine locals data */
        this.#app.use((req, res, next) => {
            this.#app.locals = clientHelper(req, res);
            next();
        })
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
        const createHttpError = require("http-errors");

        /**
         * 404 page not found error handler
         */
        this.#app.use((req, res, next) => {
            next(new createHttpError.NotFound("آدرس مورد نظر شما یافت نشد"));
        });

        /**
         * system error handler
         */
        this.#app.use((error, req, res, next) => {
            /**
             * define server internal error
             */
            const serverError = new createHttpError.InternalServerError();

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
                message
            });
        });
    }

    /**
     * system default database data initializer
     * @returns {Promise<void>}
     */
    async systemDatabaseCollectionInitializer() {
        try {
            /** import system permissions initializer */
            const {permissionsInitializer} = require("app/initializers/permission.collecion.initializer");
            /** initialize system default permissions */
            await permissionsInitializer();
        } catch (err) {
            console.error(err);
        }
    }
}