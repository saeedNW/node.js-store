/** import redis module */
const redis = require("redis");
/** create redis client */
const redisClient = redis.createClient();
/** connect client to database */
redisClient.connect().then(() => {return true});
/** define redis behavior during connection process */
redisClient.on("connect", () => console.log("Redis database connecting..."));
/** define redis behavior when an error occurs */
redisClient.on("error", (err) => console.log("Redis Error: ", err.messages));
/** define redis behavior when connection established successfully */
redisClient.on("ready", () => console.log("Redis database connected successfully"));
/** define redis behavior when connection closed */
redisClient.on("end", () => console.log("Redis database disconnected successfully"));
/** export redis client */
module.exports = redisClient;