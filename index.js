const process = require("process");

Promise.prototype.timeOut = (ms = 1000) =>
    new Promise((r, j) => setTimeout(r, ms));

Promise.prototype._immediateFn = (fn) => process.nextTick(fn);

Date.prototype.utc = {};

Object.defineProperties(Date.prototype.utc, {
    hr: { get() { return new Date().getUTCHours() } },
    date: { get() { return new Date().getUTCDate() } },
    month: { get() { return new Date().getUTCMonth() } },
    min: { get() { return new Date().getUTCMinutes() } },
    sec: { get() { return new Date().getUTCSeconds() } },
    year: { get() { return new Date().getUTCFullYear() } },
    millisec: { get() { return new Date().getUTCMilliseconds() } }
})

globalThis.fileDate = (utc = false, native = false) => {
    const date = new Date();
    return native ? date.toISOString() : utc ? `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}-${date.getUTCHours()}-${date.getUTCMinutes()}-${date.getUTCSeconds()}-${date.getUTCMilliseconds()}` : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;
}