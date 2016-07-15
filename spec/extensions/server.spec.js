/* jshint -W058 */
const expect = require("expect");
const {lib, parallel} = require("../loader");
const BB = lib(require, "index");

describe("extensions/server", function () {
    beforeEach(function () {
        BB.extend(parallel(require, __filename));
    });

    describe("Message#setCookie", function () {
        let message;
        beforeEach(function () {
            message = new BB.Message();
        });

        describe("when no cookies have been previously set", function () {
            it("sets the \"Set-Cookie\" header to the appropriate string", function () {
                message.setCookie("cookieName", {value: "cookieValue"});
                expect(message.headers["Set-Cookie"]).toEqual("cookieName=cookieValue");
            });
        });

        describe("when cookies have been previously set", function () {
            beforeEach(function () {
                message.setCookie("previousOne", {value: "previousOneValue"});
            });

            it("sets the \"Set-Cookie\" header to an array of headers", function () {
                message.setCookie("cookieName", {value: "cookieValue"});

                expect(message.headers["Set-Cookie"]).toEqual([
                    "previousOne=previousOneValue",
                    "cookieName=cookieValue"
                ]);
            });
        });
    });
});