const Location = require("../Location");
const createProxy = require("../utils/createProxy");
const isRegExp = require("../utils/isRegExp");

function returnTrue() {
    return true;
}

/**
 * A middleware that forwards requests that pass the given test function
 * to the given target. If the target is not an app, it should be a string
 * or options hash that is used to create a proxy.
 *
 * Example:
 *
 *   let mach = require('mach');
 *   let app = mach.stack();
 *
 *   // Forward all requests to example.com.
 *   app.use(mach.proxy, 'http://www.example.com');
 *
 *   // Forward all requests that match "/images/*.jpg" to S3.
 *   app.use(mach.proxy, 'http://s3.amazon.com/my-bucket', /\/images/*.jpg/);
 *
 *   mach.serve(app);
 */
function proxy(app, target, test) {
    test = test || returnTrue;

    if (isRegExp(test)) {
        const pattern = test;
        test = function (conn) {
            return pattern.test(conn.href);
        };
    } else if (typeof test !== "function") {
        throw new Error("mach.proxy needs a test function");
    }

    let targetApp;
    if (typeof target === "function") {
        targetApp = target;
    } else if (typeof target === "string" || target instanceof Location) {
        targetApp = createProxy(target);
    } else {
        throw new Error("mach.proxy needs a target app");
    }

    return function (conn) {
        return conn.call(test(conn) ? targetApp : app);
    };
}

module.exports = proxy;
