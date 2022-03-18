"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
var spad = function (str) { return str.toString().padStart(2, '0'); };
var parseSymbols = function (e, t, n) {
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
exports.default = Date;
//# sourceMappingURL=date.js.map