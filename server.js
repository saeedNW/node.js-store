/** Add the root project directory to the app module search path */
require('app-module-path').addPath(__dirname);

/** import application main class */
const Application = require("app/app");

/** create application class instance */
new Application(3000, "mongodb://127.0.0.1:27017/nodejs_store");