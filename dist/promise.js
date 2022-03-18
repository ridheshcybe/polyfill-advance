"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promise = /** @class */ (function () {
    function promise(exec) {
        this.finallycb = function () { };
        this.value = null;
        this.called = false;
        this.onJ = null;
        this.onR = null;
        this.j = false;
        this.f = false;
        var self = this;
        function d(e, f) {
            var l = "r" == e ? self.onR : self.onJ;
            "r" == e ? (self.f = !0) : (self.j = !0);
            self.value = f;
            "function" == typeof l && (l(f), self.called = !0);
        }
        try {
            exec(function (e) { return d("r", e); }, function (e) { return d("j", e); });
        }
        catch (e) {
            d("r", e);
        }
    }
    promise.prototype.then = function (cb) {
        this.onR = cb;
        if (this.f && !this.called) {
            this.called = true;
            this.finallycb();
            this.onR(this.value);
        }
        return this;
    };
    promise.prototype.catch = function (cb) {
        this.onJ = cb;
        if (this.j && !this.called) {
            this.called = true;
            this.finallycb();
            this.onJ(this.value);
        }
        return this;
    };
    promise.prototype.finally = function (cb) {
        this.finallycb = cb;
        return this;
    };
    return promise;
}());
promise.timeOut = function (ms) {
    if (ms === void 0) { ms = 1000; }
    return new Promise(function (r, j) { return setTimeout(r, ms); });
};
promise.allSettled = function (promises) { return promise.all(promises.map(function (p) { return p
    .then(function (value) { return ({ status: 'fulfilled', value: value }); })
    .catch(function (reason) { return ({ status: 'rejected', reason: reason }); }); })); };
promise.immediate = function (fn, aftereloop) {
    if (aftereloop === void 0) { aftereloop = false; }
    if (!aftereloop)
        return process.nextTick(fn);
    setTimeout(function () { return fn(); }, 0);
};
promise.resolve = function (val) { return new Promise(function (r, _) {
    r(val);
}); };
promise.reject = function (reason) { return new Promise(function (_, r) {
    r(reason);
}); };
promise.race = function (promises) { return new promise(function (r, j) {
    promises.map(function (promise) { return promise.then(r, j); });
}); };
promise.all = function (promises) {
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
exports.default = promise;
//# sourceMappingURL=promise.js.map