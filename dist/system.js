System.register("date", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            //@ts-ignore
            Date.prototype.format = function (format) {
                var self = this;
                var shorten = function (s) {
                    var reversed = s.toString().split('').reverse().join('');
                    return reversed.substr(reversed.length - 3).split('').reverse().join('');
                };
                var thf = function (hr) {
                    var twelveHourFormat = hr % 12;
                    return 0 === twelveHourFormat ? 12 : twelveHourFormat;
                };
                var spad = function (str) { return str.toString().padStart(2, '0'); };
                var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                var weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var formats = {
                    '%d': function () { return self.getDate(); },
                    '%i': function () { return self.getHours(); },
                    '%n': function () { return self.getMinutes(); },
                    '%s': function () { return self.getSeconds(); },
                    '%y': function () { return self.getFullYear(); },
                    '%m': function () { return self.getMonth() + 1; },
                    '%h': function () { return thf(self.getHours()); },
                    '%D': function () { return spad(self.getDate()); },
                    '%I': function () { return spad(self.getHours()); },
                    '%N': function () { return spad(self.getMinutes()); },
                    '%S': function () { return spad(self.getSeconds()); },
                    '%w': function () { return weekNames[self.getDay()]; },
                    '%M': function () { return spad(self.getMonth() + 1); },
                    '%H': function () { return spad(thf(self.getHours())); },
                    '%f': function () { return monthNames[self.getMonth()]; },
                    '%W': function () { return shorten(weekNames[self.getDay()]); },
                    '%a': function () { return 12 <= self.getHours() ? 'PM' : 'AM'; },
                    '%F': function () { return shorten(monthNames[self.getMonth()]); },
                    '%Y': function () {
                        var year = self.getFullYear().toString();
                        return year.substring(year.length - 2);
                    },
                };
                return Object.keys(formats).reduce(function (d, fKey) {
                    return 0 <= d.indexOf(fKey) ? d.replace(fKey, formats[fKey]()) : d;
                }, format);
            };
            //@ts-ignore
            Date.utc = {
                hr: function () { return new Date().getUTCHours(); },
                date: function () { return new Date().getUTCDate(); },
                month: function () { return new Date().getUTCMonth(); },
                min: function () { return new Date().getUTCMinutes(); },
                sec: function () { return new Date().getUTCSeconds(); },
                year: function () { return new Date().getUTCFullYear(); },
                millisec: function () { return new Date().getUTCMilliseconds(); }
            };
            //@ts-ignore
            Date.prototype.utc = {
                date: function () {
                    return this.getUTCDate();
                },
                month: function () {
                    return this.getUTCMonth();
                },
                hr: function () {
                    return this.getUTCHours();
                },
                min: function () {
                    return this.getUTCMinutes();
                },
                sec: function () {
                    return this.getUTCSeconds();
                },
                year: function () {
                    return this.getUTCFullYear();
                },
                millisec: function () {
                    return this.getUTCMilliseconds();
                }
            };
            exports_1("default", Date);
        }
    };
});
System.register("promise", [], function (exports_2, context_2) {
    "use strict";
    var promise;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            promise = /** @class */ (function () {
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
            exports_2("default", promise);
        }
    };
});
System.register("singles", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function fileDate(utc, native) {
        if (utc === void 0) { utc = !1; }
        if (native === void 0) { native = !1; }
        var o = new Date;
        if (native)
            return o.toISOString();
        if (utc)
            return "".concat(o.getUTCFullYear(), "-").concat(o.getUTCMonth() + 1, "-").concat(o.getUTCDate(), "-").concat(o.getUTCHours(), "-").concat(o.getUTCMinutes(), "-").concat(o.getUTCSeconds(), "-").concat(o.getUTCMilliseconds());
        return "".concat(o.getFullYear(), "-").concat(o.getMonth() + 1, "-").concat(o.getDate(), "-").concat(o.getHours(), "-").concat(o.getMinutes(), "-").concat(o.getSeconds(), "-").concat(o.getMilliseconds());
    }
    exports_3("fileDate", fileDate);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("global", ["date", "promise", "singles"], function (exports_4, context_4) {
    "use strict";
    var date_1, promise_1, singles_1;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (date_1_1) {
                date_1 = date_1_1;
            },
            function (promise_1_1) {
                promise_1 = promise_1_1;
            },
            function (singles_1_1) {
                singles_1 = singles_1_1;
            }
        ],
        execute: function () {
            exports_4("date", date_1.default);
            exports_4("promise", promise_1.default);
            exports_4("fileDate", singles_1.fileDate);
        }
    };
});
//# sourceMappingURL=system.js.map