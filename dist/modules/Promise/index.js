"use strict";
//@ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError() {
        var _this = _super.call(this) || this;
        _this.message = 'TimeoutError';
        _this.name = 'TimeoutError';
        return _this;
    }
    return TimeoutError;
}(Error));
Promise.timeOut = function (ms, promise) {
    if (promise === void 0) { promise = Promise.resolve(null); }
    var error = new TimeoutError(), timeout;
    return Promise.race([
        promise,
        new Promise(function (_, j) {
            timeout = setTimeout(function () { return j(error); }, ms);
        }),
    ]).then(function (v) {
        clearTimeout(timeout);
    }, function (err) {
        clearTimeout(timeout);
        throw err;
    });
};
Promise.allSettled = function (promises) {
    if (promises === void 0) { promises = [new Promise(function (r, j) { return r(); })]; }
    return Promise.all(promises.map(function (p) { return p
        .then(function (value) { return ({ status: 'fulfilled', value: value }); })
        .catch(function (reason) { return ({ status: 'rejected', reason: reason }); }); }));
};
Promise.immediate = function (fn, aftereloop) {
    if (fn === void 0) { fn = function () { }; }
    if (aftereloop === void 0) { aftereloop = false; }
    if (!aftereloop)
        return process.nextTick(fn);
    setTimeout(function () { return fn(); }, 0);
};
Promise.resolve = function (val) { return new Promise(function (r, _) {
    r(val);
}); };
Promise.reject = function (reason) { return new Promise(function (_, r) {
    r(reason);
}); };
Promise.race = function (promises) { return new Promise(function (r, j) {
    promises.map(function (promise) { return promise.then(r, j); });
}); };
Promise.all = function (promises) {
    var fulfilledPromises = [], result = [];
    return new Promise(function (resolve, reject) {
        promises.forEach(function (promise, index) { return promise.then(function (val) {
            fulfilledPromises.push(true);
            result[index] = val;
            if (fulfilledPromises.length === promises.length)
                return resolve(result);
        }).catch(function (error) {
            return reject(error);
        }); });
    });
};
exports.default = Promise;
//# sourceMappingURL=index.js.map