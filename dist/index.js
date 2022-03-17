"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./date");
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
globalThis.Promise = promise_1.default;
globalThis.fileDate = fileDate;
//# sourceMappingURL=index.js.map