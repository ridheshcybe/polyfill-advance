"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promise_1 = require("./promise");
function fileDate(utc, native) {
    if (utc === void 0) { utc = !1; }
    if (native === void 0) { native = !1; }
    var o = new Date;
    if (native)
        return o.toISOString();
    if (utc)
        return o.getUTCFullYear() + "-" + (o.getUTCMonth() + 1) + "-" + o.getUTCDate() + "-" + o.getUTCHours() + "-" + o.getUTCMinutes() + "-" + o.getUTCSeconds() + "-" + o.getUTCMilliseconds();
    return o.getFullYear() + "-" + (o.getMonth() + 1) + "-" + o.getDate() + "-" + o.getHours() + "-" + o.getMinutes() + "-" + o.getSeconds() + "-" + o.getMilliseconds();
}
// @ts-ignore
Date.prototype.utc = {};
var props = {
    hr: function () { return (new Date).getUTCHours(); },
    date: function () { return (new Date).getUTCDate(); },
    month: function () { return (new Date).getUTCMonth(); },
    min: function () { return (new Date).getUTCMinutes(); },
    sec: function () { return (new Date).getUTCSeconds(); },
    year: function () { return (new Date).getUTCFullYear(); },
    millisec: function () { return (new Date).getUTCMilliseconds(); }
};
// @ts-ignore
for (var p in props)
    Object.defineProperty(Date.prototype.utc, p, { get: props[p] });
// @ts-ignore
globalThis.Promise = promise_1.default;
globalThis.fileDate = fileDate;
//# sourceMappingURL=index.js.map