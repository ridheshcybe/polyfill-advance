//@ts-ignore
Date.prototype.utc = {};
const props = {
    hr: () => (new Date).getUTCHours(),
    date: () => (new Date).getUTCDate(),
    month: () => (new Date).getUTCMonth(),
    min: () => (new Date).getUTCMinutes(),
    sec: () => (new Date).getUTCSeconds(),
    year: () => (new Date).getUTCFullYear(),
    millisec: () => (new Date).getUTCMilliseconds()
};
// @ts-ignore
for (const p in props)
    Object.defineProperty(Date.prototype.utc, p, { get: props[p] });
define("promise", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class promise {
        constructor(exec) {
            this.value = null;
            this.called = false;
            this.onJ = null;
            this.onR = null;
            this.j = false;
            this.f = false;
            const self = this;
            function d(e, f) {
                let l = "r" == e ? self.onR : self.onJ;
                "r" == e ? (self.f = !0) : (self.j = !0);
                self.value = f;
                "function" == typeof l && (l(f), self.called = !0);
            }
            try {
                exec(e => d("r", e), e => d("j", e));
            }
            catch (e) {
                d("r", e);
            }
        }
        then(cb) {
            this.onR = cb;
            if (this.f && !this.called) {
                this.called = true;
                this.onR(this.value);
            }
            return this;
        }
        catch(cb) {
            this.onJ = cb;
            if (this.j && !this.called) {
                this.called = true;
                this.onJ(this.value);
            }
            return this;
        }
        timeOut(ms = 1000) {
            return new Promise((r, j) => setTimeout(r, ms));
        }
        immediate(fn, aftereloop = false) {
            if (!aftereloop)
                return process.nextTick(fn);
            setTimeout(() => fn(), 0);
        }
        resolve(val) {
            return new Promise((r, _) => {
                r(val);
            });
        }
        reject(reason) {
            return new Promise((_, r) => {
                r(reason);
            });
        }
        all(promises) {
            let fulfilledPromises = [], result = [];
            return new Promise((resolve, reject) => {
                promises.forEach((promise, index) => promise.then((val) => {
                    fulfilledPromises.push(true);
                    result[index] = val;
                    if (fulfilledPromises.length === promises.length)
                        return resolve(result);
                }).catch((error) => {
                    return reject(error);
                }));
            });
        }
    }
    exports.default = promise;
});
define("index", ["require", "exports", "promise"], function (require, exports, promise_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("./date");
    function fileDate(utc = !1, native = !1) {
        const o = new Date;
        if (native)
            return o.toISOString();
        if (utc)
            return `${o.getUTCFullYear()}-${o.getUTCMonth() + 1}-${o.getUTCDate()}-${o.getUTCHours()}-${o.getUTCMinutes()}-${o.getUTCSeconds()}-${o.getUTCMilliseconds()}`;
        return `${o.getFullYear()}-${o.getMonth() + 1}-${o.getDate()}-${o.getHours()}-${o.getMinutes()}-${o.getSeconds()}-${o.getMilliseconds()}`;
    }
    // @ts-ignore
    globalThis.Promise = promise_1.default;
    globalThis.fileDate = fileDate;
});
//# sourceMappingURL=amd.js.map