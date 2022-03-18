System.register("date", [], function (exports_1, context_1) {
    "use strict";
    var _this, spad, parseSymbols;
    _this = this;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            //@ts-nocheck
            spad = function (str) { return str.toString().padStart(2, '0'); };
            parseSymbols = function (e, t, n) {
                var r = {
                    "%y": function () { return Math.abs(new Date(e).getFullYear() - new Date(t).getFullYear()); },
                    "%Y": function () { return spad(Math.abs(new Date(e).getFullYear() - new Date(t).getFullYear())); },
                    "%d": function () {
                        var r = e - t;
                        return 0 >= r ? 0 : parseInt(r / (-1 < n.indexOf("%Y") || -1 < n.indexOf("%y") ? 120 : 864e5)).toString();
                    },
                    "%h": function () {
                        var n = e - t;
                        return 0 >= n ? 0 : parseInt(n / 36e5).toString();
                    },
                    "%n": function () {
                        var n = e - t;
                        return 0 >= n ? 0 : parseInt(n / 6e4 % 60);
                    },
                    "%s": function () {
                        var n = e - t;
                        return 0 >= n ? 0 : parseInt(n / 1e3 % 60);
                    },
                    "%D": function () {
                        var r = e - t;
                        return 0 >= r ? "00" : spad(parseInt(-1 < n.indexOf("%Y") || -1 < n.indexOf("%y") ? r / 864e5 % 365 : r / 864e5));
                    },
                    "%H": function () {
                        var n = e - t;
                        return 0 >= n ? "00" : spad(parseInt(n / 36e5 % 60));
                    },
                    "%N": function () {
                        var n = e - t;
                        return 0 >= n ? "00" : spad(parseInt(n / 6e4 % 60));
                    },
                    "%S": function () {
                        var n = e - t;
                        return 0 >= n ? "00" : spad(parseInt(n / 1e3 % 60));
                    }
                };
                return Object.keys(r).reduce(function (e, t) { return 0 <= e.indexOf(t) ? e.replace(t, r[t]()) : e; }, n);
            };
            Date.prototype.format = function (format) {
                var t = _this, r = function (e) {
                    var t = e.toString().split("").reverse().join("");
                    return t.substr(t.length - 3).split("").reverse().join("");
                }, a = function (e) {
                    var t = e % 12;
                    return 0 === t ? 12 : t;
                }, s = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], n = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], u = {
                    "%d": function () { return t.getDate(); },
                    "%i": function () { return t.getHours(); },
                    "%n": function () { return t.getMinutes(); },
                    "%s": function () { return t.getSeconds(); },
                    "%y": function () { return t.getFullYear(); },
                    "%m": function () { return t.getMonth() + 1; },
                    "%h": function () { return a(t.getHours()); },
                    "%D": function () { return spad(t.getDate()); },
                    "%I": function () { return spad(t.getHours()); },
                    "%N": function () { return spad(t.getMinutes()); },
                    "%S": function () { return spad(t.getSeconds()); },
                    "%w": function () { return n[t.getDay()]; },
                    "%M": function () { return spad(t.getMonth() + 1); },
                    "%H": function () { return spad(a(t.getHours())); },
                    "%f": function () { return s[t.getMonth()]; },
                    "%W": function () { return r(n[t.getDay()]); },
                    "%a": function () { return 12 <= t.getHours() ? "PM" : "AM"; },
                    "%F": function () { return r(s[t.getMonth()]); },
                    "%Y": function () {
                        var e = t.getFullYear().toString();
                        return e.substring(e.length - 2);
                    }
                };
                return Object.keys(u).reduce(function (e, t) { return 0 <= e.indexOf(t) ? e.replace(t, u[t]()) : e; }, format);
            };
            Date.prototype.timeDiff = function (toms, format) { return toms instanceof Date ? parseSymbols(toms.getTime(), _this.getTime(), format) : parseSymbols(toms, _this.getTime(), format); };
            Date.prototype.timeAgo = function (fromms, symbols) {
                var r = symbols;
                var t = {
                    "%s": "second",
                    "%n": "minute",
                    "%h": "hour",
                    "%d": "day",
                    "%m": "month",
                    "%y": "year"
                }, n = void 0;
                n = fromms instanceof Date ? parseSymbols(_this.getTime(), fromms.getTime(), r.join("|")).split("|") : parseSymbols(_this.getTime(), fromms, r.join("|")).split("|");
                var i = r.reduce(function (e, r, i) {
                    var o = parseInt(n[i]), s = r.toLowerCase();
                    if (0 === o || void 0 === t[s])
                        return e;
                    var a = e ? e + " " : "";
                    return 1 === o ? a + n[i] + " " + t[s] : a + n[i] + " " + t[s] + "s";
                }, null);
                if (!i) {
                    for (var o = Object.keys(t), s = 0; s < o.length; s++)
                        if (r.includes(o[s]) || r.includes(o[s].toUpperCase())) {
                            var a = r[r.indexOf(o[s])];
                            return a || (a = r[r.indexOf(o[s].toUpperCase())]), parseSymbols(1, 1, a) + " " + t[o[s]] + "s ago";
                        }
                    return "";
                }
                return i + " ago";
            };
            Date.prototype.age = function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date;
                if (t < this)
                    return 0;
                var e = Math.abs(this.getFullYear() - t.getFullYear());
                return 0 < e && (e -= 1), t.getMonth() > this.getMonth() || t.getMonth() === this.getMonth() && t.getDate() >= this.getDate() ? e + 1 : e;
            };
            Date.utc = {
                hr: function () { return new Date().getUTCHours(); },
                date: function () { return new Date().getUTCDate(); },
                month: function () { return new Date().getUTCMonth(); },
                min: function () { return new Date().getUTCMinutes(); },
                sec: function () { return new Date().getUTCSeconds(); },
                year: function () { return new Date().getUTCFullYear(); },
                millisec: function () { return new Date().getUTCMilliseconds(); }
            };
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
                    this.finallycallback = function () { };
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
                    Object.defineProperty(this, "finallycb", {
                        get: function () {
                            return self.finallycallback;
                        },
                        set: function (val) {
                            self.finallycallback = val;
                        }
                    });
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