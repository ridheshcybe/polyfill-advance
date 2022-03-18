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
        return "".concat(o.getUTCFullYear(), "-").concat(o.getUTCMonth() + 1, "-").concat(o.getUTCDate(), "-").concat(o.getUTCHours(), "-").concat(o.getUTCMinutes(), "-").concat(o.getUTCSeconds(), "-").concat(o.getUTCMilliseconds());
    return "".concat(o.getFullYear(), "-").concat(o.getMonth() + 1, "-").concat(o.getDate(), "-").concat(o.getHours(), "-").concat(o.getMinutes(), "-").concat(o.getSeconds(), "-").concat(o.getMilliseconds());
}
exports.fileDate = fileDate;
globalThis.fileDate = fileDate;
//# sourceMappingURL=index.js.map