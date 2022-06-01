"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDate = void 0;
function fileDate(native, utc) {
    if (native === void 0) { native = !1; }
    if (utc === void 0) { utc = !1; }
    var o = new Date;
    if (native)
        return o.toISOString();
    if (utc)
        return o.getUTCFullYear() + "-" + (o.getUTCMonth() + 1) + "-" + o.getUTCDate() + "-" + o.getUTCHours() + "-" + o.getUTCMinutes() + "-" + o.getUTCSeconds() + "-" + o.getUTCMilliseconds();
    return o.getFullYear() + "-" + (o.getMonth() + 1) + "-" + o.getDate() + "-" + o.getHours() + "-" + o.getMinutes() + "-" + o.getSeconds() + "-" + o.getMilliseconds();
}
exports.fileDate = fileDate;
globalThis.fileDate = fileDate;
//# sourceMappingURL=index.js.map