const R = require("ramda");
const {
    contentLens,
    bufferEmitter
} = require("../core");
const {pre} = require("./combinators");

const attachBody = R.curry((ctx, buf) => R.merge(ctx, R.objOf("body", buf)));

module.exports = pre((ctx) => R.view(contentLens, ctx).consumeContent(bufferEmitter)
        .then((buf) => buf.length > 0 ? attachBody(ctx, buf) : ctx));
