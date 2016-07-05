let parseQuery = require("./parseQuery");

function parseCookie(cookie) {
    return parseQuery(cookie, {delimiter: /[;,] */});
}

module.exports = parseCookie;