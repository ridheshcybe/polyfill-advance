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
System.register("modules/Date/index", [], function (exports_1, context_1) {
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
//@ts-nocheck
System.register("modules/Promise/index", [], function (exports_2, context_2) {
    "use strict";
    var TimeoutError;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {//@ts-nocheck
            TimeoutError = /** @class */ (function (_super) {
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
            exports_2("default", Promise);
        }
    };
});
System.register("modules/singles/index", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
    exports_3("fileDate", fileDate);
    return {
        setters: [],
        execute: function () {
            globalThis.fileDate = fileDate;
        }
    };
});
System.register("global", ["modules/Date/index", "modules/Promise/index", "modules/singles/index"], function (exports_4, context_4) {
    "use strict";
    var Date_1, Promise_1, singles_1;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (Date_1_1) {
                Date_1 = Date_1_1;
            },
            function (Promise_1_1) {
                Promise_1 = Promise_1_1;
            },
            function (singles_1_1) {
                singles_1 = singles_1_1;
            }
        ],
        execute: function () {
            exports_4("date", Date_1.default);
            exports_4("promise", Promise_1.default);
            exports_4("fileDate", singles_1.fileDate);
            global.Date = Date_1.default;
            global.Promise = Promise_1.default;
            global.fileDate = singles_1.fileDate;
        }
    };
});
System.register("modules/Date/date.test", ["modules/Date/index"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            ['timeDiff', 'format'].forEach(function (method) {
                expect(Date.prototype[method]).toBeDefined();
            });
            describe('check Date.utc', function () {
                it('length Check', function () {
                    expect(Object.keys(Date.utc).length).toBe(7);
                });
                ['hr', 'date', 'month', 'min', 'sec', 'year', 'millisec'].forEach(function (e) {
                    it("Defines " + e + "()", function () {
                        expect(Date.utc[e]).toBeDefined();
                        expect(Date.utc[e]).toBeInstanceOf(Function);
                    });
                });
            });
            describe('check Date.prototype.utc', function () {
                var date = new Date();
                it('length check', function () {
                    expect(Object.keys(date.utc).length).toBe(7);
                });
                ['hr', 'date', 'month', 'min', 'sec', 'year', 'millisec'].forEach(function (e) {
                    it("Defines " + e + "()", function () {
                        expect(date.utc[e]).toBeDefined();
                        expect(date.utc[e]).toBeInstanceOf(Function);
                    });
                });
            });
        }
    };
});
function hasSymbols() {
    if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
        return false;
    }
    if (typeof Symbol.iterator === 'symbol') {
        return true;
    }
    var obj = {};
    var sym = Symbol('test');
    var symObj = Object(sym);
    if (typeof sym === 'string') {
        return false;
    }
    if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
        return false;
    }
    if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
        return false;
    }
    var symVal = 42;
    obj[sym] = symVal;
    //@ts-ignore
    for (sym in obj) {
        return false;
    }
    if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
        return false;
    }
    if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
        return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === 'function') {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
        }
    }
    return true;
}
;
var isFunction = function (fn) {
    return typeof fn === 'function' && String.prototype.toString.call(fn) === '[object Function]';
};
var isntObject = function (o) { return o === null || !(o instanceof Object || typeof o === 'object'); };
//@ts-ignore
var isArgs = Object.isArguments = function (val) {
    var str = Object.prototype.toString.call(val);
    var isArgs = str === '[object Arguments]';
    if (!isArgs)
        isArgs = str !== '[object Array]' && val !== null && typeof val === 'object' && typeof val.length === 'number' && val.length >= 0 && Object.prototype.toString.call(val.callee) === '[object Function]';
    return isArgs;
};
if (!Object.keys) {
    var has = Object.prototype.hasOwnProperty;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
    var hasProtoEnumBug = isEnumerable.call(function () { }, 'prototype');
    var dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ];
    var equalsConstructorPrototype = function (o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
    };
    var excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
    };
    var hasAutomationEqualityBug = (function () {
        if (typeof window === 'undefined') {
            return false;
        }
        for (var k in window) {
            try {
                if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
                    try {
                        equalsConstructorPrototype(window[k]);
                    }
                    catch (e) {
                        return true;
                    }
                }
            }
            catch (e) {
                return true;
            }
        }
        return false;
    }());
    var eCPINB = function (o) {
        if (typeof window === 'undefined' || !hasAutomationEqualityBug)
            return equalsConstructorPrototype(o);
        try {
            return equalsConstructorPrototype(o);
        }
        catch (e) {
            return false;
        }
    };
    Object.keys = function keys(object) {
        var isObject = object !== null && typeof object === 'object';
        var isFunction = Object.prototype.toString.call(object) === '[object Function]';
        var isArguments = isArgs(object);
        var isString = isObject && Object.prototype.toString.call(object) === '[object String]';
        var theKeys = [];
        if (!isObject && !isFunction && !isArguments) {
            throw new TypeError('Object.keys called on a non-object');
        }
        var skipProto = hasProtoEnumBug && isFunction;
        if (isString && object.length > 0 && !has.call(object, 0))
            for (var i = 0; i < object.length; ++i)
                theKeys.push(String(i));
        if (isArguments && object.length > 0) {
            for (var j = 0; j < object.length; ++j)
                theKeys.push(String(j));
        }
        else {
            for (var name in object)
                if (!(skipProto && name === 'prototype') && has.call(object, name))
                    theKeys.push(String(name));
        }
        if (hasDontEnumBug)
            for (var k = 0; k < dontEnums.length; ++k)
                if (!(eCPINB(object) && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k]))
                    theKeys.push(dontEnums[k]);
        return theKeys;
    };
}
if (!Object.assign) {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof target == 'undefined' && target == null)
            throw new TypeError('target must be an object');
        var objTarget = Object(target);
        args.forEach(function (e) {
            var source = Object(e);
            var props = Object.keys(source);
            var getSymbols = hasSymbols() && (Object.getOwnPropertySymbols || hasSymbols() ? Object.getOwnPropertySymbols : null);
            if (getSymbols) {
                var syms = getSymbols(source);
                for (var i = 0; i < syms.length; ++i) {
                    var key = syms[i];
                    if (Object.prototype.propertyIsEnumerable.call(source, key))
                        Array.prototype.push.call(props, key);
                }
            }
            ;
            props.forEach(function (key) {
                var value = source[key];
                if (Object.prototype.propertyIsEnumerable.call(source, key))
                    objTarget[key] = value;
            });
        });
        return objTarget;
    };
}
if (!Object.is) {
    Object.is = function (a, b) {
        if (a === 0 && b === 0)
            return 1 / a === 1 / b;
        if (a === b)
            return true;
        if (a !== a && b !== b)
            return true;
        return false;
    };
}
if (!Object.setPrototypeOf) {
    Object.setPrototypeOf = { __proto__: [] } instanceof Array ? (function (obj, proto) {
        obj.__proto__ = proto;
        return obj;
    }) : function (obj, proto) {
        for (var prop in proto)
            if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
                obj[prop] = proto[prop];
            }
        return obj;
    };
}
if (!Object.getPrototypeOf) {
    Object.getPrototypeOf = function (o) {
        if (o !== Object(o)) {
            throw TypeError("Object.getPrototypeOf called on non-object");
        }
        return o.__proto__ || o.constructor.prototype || Object.prototype;
    };
}
if (typeof Object.getOwnPropertyNames !== "function") {
    Object.getOwnPropertyNames = function (o) {
        if (o !== Object(o)) {
            throw TypeError("Object.getOwnPropertyNames called on non-object");
        }
        var props = [], p;
        for (p in o) {
            if (Object.prototype.hasOwnProperty.call(o, p)) {
                props.push(p);
            }
        }
        return props;
    };
}
if (typeof Object.create !== "function") {
    //@ts-ignore
    Object.create = function create(prototype, properties) {
        if (!isntObject(prototype))
            throw new TypeError('Object.create may only be an Object or null');
        var obj = new Function('e', 'function Ctor() {}Ctor.prototype=e;return new Ctor')(prototype);
        obj.constructor.prototype = prototype;
        properties == undefined || Object.defineProperties(obj, properties);
        return obj;
    };
}
if (!Object.defineProperty) {
    //@ts-ignore
    Object.defineProperty = function (obj, key, descriptor) {
        if (isntObject(obj))
            throw new TypeError("Object.defineProperty called on non-object");
        if (isntObject(descriptor))
            throw new TypeError("Property description must be an object");
        if (["string", "number", "symbol"].includes(typeof key))
            throw new TypeError("Property name must be a non-empty string/number/symbol");
        var keystr = String(key);
        var check = function () {
            if (!Object.hasOwnProperty('__defineGetter__'))
                throw new TypeError('Getters & setters cannot be defined on this javascript engine');
            if ('value' in descriptor || 'writable' in descriptor)
                throw new TypeError('A property cannot both have accessors and be writable or have a value');
        };
        if ('get' in descriptor) {
            if (typeof descriptor.get !== 'function')
                throw new TypeError('Getter must be a function');
            check();
            //@ts-ignore
            Object.__defineGetter__.call(obj, keystr, descriptor.get);
        }
        else {
            obj[keystr] = descriptor.value;
        }
        ;
        if ('set' in descriptor) {
            if (typeof descriptor.set !== 'function')
                throw new TypeError('Setter must be a function');
            check();
            //@ts-ignore
            Object.__defineSetter__.call(obj, keystr, descriptor.set);
        }
        if ('value' in descriptor)
            obj[keystr] = descriptor.value;
        return obj;
    };
}
;
if (typeof Object.defineProperties !== "function") {
    Object.defineProperties = function (obj, properties) {
        if (isntObject(obj))
            throw TypeError("Object.defineProperties called on non-object");
        Object.keys(properties).forEach(function (n) { return Object.defineProperty(obj, n, properties[n]); });
        return obj;
    };
}
;
if (typeof Object.freeze !== "function") {
    Object.freeze = function (obj) {
        if (isntObject(obj))
            throw TypeError("Object.freeze called on non-object");
        return obj;
    };
}
System.register("modules/Object/Object.test", ["."], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (_2) {
            }
        ],
        execute: function () {
            describe('check Object.*', function () {
                ['isArguments', 'keys', 'assign', 'is', 'setPrototypeOf', 'getPrototypeOf', 'getOwnPropertyNames', 'create', 'defineProperty', 'defineProperties', 'freeze'].forEach(function (e) {
                    it("Defines " + e + "()", function () {
                        expect(Object[e]).toBeDefined();
                    });
                });
            });
        }
    };
});
System.register("modules/Promise/promise.test", ["modules/Promise/index"], function (exports_7, context_7) {
    "use strict";
    var _3;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (_3_1) {
                _3 = _3_1;
            }
        ],
        execute: function () {
            describe("Promise", function () {
                describe('dynamic', function () {
                    var p = new _3.default(function (r, j) { return r(void 0); });
                    ['then', 'catch'].forEach(function (e) {
                        it("defines " + e + "()", function () {
                            expect(p[e]).toBeDefined();
                            expect(p[e]).toBeInstanceOf(Function);
                        });
                    });
                });
                describe('static', function () {
                    ['timeOut', 'race', 'allSettled', 'immediate', 'resolve', 'reject'].forEach(function (e) {
                        it("defines " + e + "()", function () {
                            expect(_3.default[e]).toBeDefined();
                            expect(_3.default[e]).toBeInstanceOf(Function);
                        });
                    });
                });
            });
        }
    };
});
System.register("modules/singles/singles.test", ["modules/singles/index"], function (exports_8, context_8) {
    "use strict";
    var _4;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (_4_1) {
                _4 = _4_1;
            }
        ],
        execute: function () {
            it('FileDate check', function () {
                expect(_4.fileDate()).toBeDefined();
                expect(typeof _4.fileDate()).toBe('string');
                expect(_4.fileDate().includes('-')).toBeTruthy();
            });
        }
    };
});
//# sourceMappingURL=system.js.map