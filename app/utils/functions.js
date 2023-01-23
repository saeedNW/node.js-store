/**
 * 5 digit random number generator
 * @returns {number}
 */
function randomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000);
}

module.exports = {
    randomNumberGenerator
}