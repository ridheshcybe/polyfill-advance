System.register("date", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            //@ts-ignore
            Date.prototype.format = function (format) {
                const self = this;
                const shorten = (s) => {
                    var reversed = s.toString().split('').reverse().join('');
                    return reversed.substr(reversed.length - 3).split('').reverse().join('');
                };
                const thf = (hr) => {
                    var twelveHourFormat = hr % 12;
                    return 0 === twelveHourFormat ? 12 : twelveHourFormat;
                };
                const spad = (str) => str.toString().padStart(2, '0');
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const formats = {
                    '%d': () => self.getDate(),
                    '%i': () => self.getHours(),
                    '%n': () => self.getMinutes(),
                    '%s': () => self.getSeconds(),
                    '%y': () => self.getFullYear(),
                    '%m': () => self.getMonth() + 1,
                    '%h': () => thf(self.getHours()),
                    '%D': () => spad(self.getDate()),
                    '%I': () => spad(self.getHours()),
                    '%N': () => spad(self.getMinutes()),
                    '%S': () => spad(self.getSeconds()),
                    '%w': () => weekNames[self.getDay()],
                    '%M': () => spad(self.getMonth() + 1),
                    '%H': () => spad(thf(self.getHours())),
                    '%f': () => monthNames[self.getMonth()],
                    '%W': () => shorten(weekNames[self.getDay()]),
                    '%a': () => 12 <= self.getHours() ? 'PM' : 'AM',
                    '%F': () => shorten(monthNames[self.getMonth()]),
                    '%Y': () => {
                        var year = self.getFullYear().toString();
                        return year.substring(year.length - 2);
                    },
                };
                return Object.keys(formats).reduce((d, fKey) => 0 <= d.indexOf(fKey) ? d.replace(fKey, formats[fKey]()) : d, format);
            };
            //@ts-ignore
            Date.utc = {
                hr: () => new Date().getUTCHours(),
                date: () => new Date().getUTCDate(),
                month: () => new Date().getUTCMonth(),
                min: () => new Date().getUTCMinutes(),
                sec: () => new Date().getUTCSeconds(),
                year: () => new Date().getUTCFullYear(),
                millisec: () => new Date().getUTCMilliseconds()
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
System.register("date.test", ["date"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            describe('check Date.utc', () => {
                it('length Check', () => {
                    expect(Object.keys(Date.utc).length).toBe(7);
                });
                ['hr', 'date', 'month', 'min', 'sec', 'year', 'millisec'].forEach(e => {
                    it(`Defines ${e}()`, () => {
                        expect(Date.utc[e]).toBeDefined();
                        expect(Date.utc[e]).toBeInstanceOf(Function);
                    });
                });
            });
            describe('check Date.prototype.utc', () => {
                const date = new Date();
                it('length check', () => {
                    expect(Object.keys(date.utc).length).toBe(7);
                });
                ['hr', 'date', 'month', 'min', 'sec', 'year', 'millisec'].forEach(e => {
                    it(`Defines ${e}()`, () => {
                        expect(date.utc[e]).toBeDefined();
                        expect(date.utc[e]).toBeInstanceOf(Function);
                    });
                });
            });
        }
    };
});
System.register("promise", [], function (exports_3, context_3) {
    "use strict";
    var promise;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            promise = class promise {
                constructor(exec) {
                    this.finallycb = () => { };
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
                        this.finallycb();
                        this.onR(this.value);
                    }
                    return this;
                }
                catch(cb) {
                    this.onJ = cb;
                    if (this.j && !this.called) {
                        this.called = true;
                        this.finallycb();
                        this.onJ(this.value);
                    }
                    return this;
                }
                finally(cb) {
                    this.finallycb = cb;
                    return this;
                }
            };
            promise.timeOut = function (ms = 1000) {
                return new Promise((r, j) => setTimeout(r, ms));
            };
            promise.allSettled = (promises) => promise.all(promises.map(p => p
                .then(value => ({ status: 'fulfilled', value }))
                .catch(reason => ({ status: 'rejected', reason }))));
            promise.immediate = (fn, aftereloop = false) => {
                if (!aftereloop)
                    return process.nextTick(fn);
                setTimeout(() => fn(), 0);
            };
            promise.resolve = (val) => new Promise((r, _) => {
                r(val);
            });
            promise.reject = (reason) => new Promise((_, r) => {
                r(reason);
            });
            promise.race = (promises) => new promise((r, j) => {
                promises.map((promise) => promise.then(r, j));
            });
            promise.all = (promises) => {
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
            };
            exports_3("default", promise);
        }
    };
});
System.register("singles", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    function fileDate(utc = !1, native = !1) {
        const o = new Date;
        if (native)
            return o.toISOString();
        if (utc)
            return `${o.getUTCFullYear()}-${o.getUTCMonth() + 1}-${o.getUTCDate()}-${o.getUTCHours()}-${o.getUTCMinutes()}-${o.getUTCSeconds()}-${o.getUTCMilliseconds()}`;
        return `${o.getFullYear()}-${o.getMonth() + 1}-${o.getDate()}-${o.getHours()}-${o.getMinutes()}-${o.getSeconds()}-${o.getMilliseconds()}`;
    }
    exports_4("fileDate", fileDate);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("global", ["date", "promise", "singles"], function (exports_5, context_5) {
    "use strict";
    var date_1, promise_1, singles_1;
    var __moduleName = context_5 && context_5.id;
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
            exports_5("date", date_1.default);
            exports_5("promise", promise_1.default);
            exports_5("fileDate", singles_1.fileDate);
        }
    };
});
System.register("promise.test", ["promise"], function (exports_6, context_6) {
    "use strict";
    var promise_2;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (promise_2_1) {
                promise_2 = promise_2_1;
            }
        ],
        execute: function () {
            describe("Promise", () => {
                describe('dynamic', () => {
                    const p = new promise_2.default((r, j) => r());
                    ['then', 'catch'].forEach(e => {
                        it(`defines ${e}()`, () => {
                            expect(p[e]).toBeDefined();
                            expect(p[e]).toBeInstanceOf(Function);
                        });
                    });
                });
                describe('static', () => {
                    ['timeOut', 'race', 'allSettled', 'immediate', 'resolve', 'reject'].forEach(e => {
                        it(`defines ${e}()`, () => {
                            expect(promise_2.default[e]).toBeDefined();
                            expect(promise_2.default[e]).toBeInstanceOf(Function);
                        });
                    });
                });
            });
        }
    };
});
System.register("singles.test", ["singles"], function (exports_7, context_7) {
    "use strict";
    var singles_2;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (singles_2_1) {
                singles_2 = singles_2_1;
            }
        ],
        execute: function () {
            it('FileDate check', () => {
                expect(singles_2.fileDate()).toBeDefined();
                expect(typeof singles_2.fileDate()).toBe('string');
                expect(singles_2.fileDate().includes('-')).toBeTruthy();
            });
        }
    };
});
//# sourceMappingURL=system.js.map