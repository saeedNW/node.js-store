/**
 * import express router
 * define main router
 */
const mainRouter = require("express").Router();
/** import access token verifier */
const {accessTokenVerification, checkRole} = require("app/http/middlewares/verify.access.token.middleware");
/** import express-graphql */
const {graphqlHTTP} = require("express-graphql")

/** import index router */
const {indexRouter} = require("./api/index");
/** initialize index router */
mainRouter.use("/", indexRouter);

/** import user main router */
const {userMainRouter} = require("./user");
/** initialize user router */
mainRouter.use("/user", userMainRouter);

/** import admin main router */
const {adminMainRouter} = require("./admin");
/** initialize admin router */
mainRouter.use("/admin", accessTokenVerification, checkRole("ADMIN"), adminMainRouter);

/** import graphql config */
const {graphqlConfig} = require("app/graphql/graphql.config");
/** initialize admin router */
mainRouter.use("/graphql", graphqlHTTP(graphqlConfig));

/** export main router */
module.exports = {
    mainRouter
}