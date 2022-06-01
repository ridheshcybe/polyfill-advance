//@ts-nocheck
const spad = (str: any): string => str.toString().padStart(2, '0');
const parseSymbols = (e, t, n) => {
    const r = {
        "%y": () => Math.abs(new Date(e).getFullYear() - new Date(t).getFullYear()),
        "%Y": () => spad(Math.abs(new Date(e).getFullYear() - new Date(t).getFullYear())),
        "%d"() {
            const r = e - t;
            return 0 >= r ? 0 : parseInt(r / (-1 < n.indexOf("%Y") || -1 < n.indexOf("%y") ? 120 : 864e5)).toString()
        },
        "%h"() {
            const n = e - t;
            return 0 >= n ? 0 : parseInt(n / 36e5).toString()
        },
        "%n"() {
            const n = e - t;
            return 0 >= n ? 0 : parseInt(n / 6e4 % 60)
        },
        "%s"() {
            const n = e - t;
            return 0 >= n ? 0 : parseInt(n / 1e3 % 60)
        },
        "%D"() {
            const r = e - t;
            return 0 >= r ? "00" : spad(parseInt(-1 < n.indexOf("%Y") || -1 < n.indexOf("%y") ? r / 864e5 % 365 : r / 864e5))
        },
        "%H"() {
            const n = e - t;
            return 0 >= n ? "00" : spad(parseInt(n / 36e5 % 60))
        },
        "%N"() {
            const n = e - t;
            return 0 >= n ? "00" : spad(parseInt(n / 6e4 % 60))
        },
        "%S"() {
            const n = e - t;
            return 0 >= n ? "00" : spad(parseInt(n / 1e3 % 60))
        }
    };
    return Object.keys(r).reduce((e, t) => 0 <= e.indexOf(t) ? e.replace(t, r[t]()) : e, n)
};

Date.prototype.format = (format: string): string => {
    const t = this,
        r = e => {
            var t = e.toString().split("").reverse().join("");
            return t.substr(t.length - 3).split("").reverse().join("")
        },
        a = e => {
            var t = e % 12;
            return 0 === t ? 12 : t
        },
        s = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        n = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        u = {
            "%d": () => t.getDate(),
            "%i": () => t.getHours(),
            "%n": () => t.getMinutes(),
            "%s": () => t.getSeconds(),
            "%y": () => t.getFullYear(),
            "%m": () => t.getMonth() + 1,
            "%h": () => a(t.getHours()),
            "%D": () => spad(t.getDate()),
            "%I": () => spad(t.getHours()),
            "%N": () => spad(t.getMinutes()),
            "%S": () => spad(t.getSeconds()),
            "%w": () => n[t.getDay()],
            "%M": () => spad(t.getMonth() + 1),
            "%H": () => spad(a(t.getHours())),
            "%f": () => s[t.getMonth()],
            "%W": () => r(n[t.getDay()]),
            "%a": () => 12 <= t.getHours() ? "PM" : "AM",
            "%F": () => r(s[t.getMonth()]),
            "%Y": () => {
                var e = t.getFullYear().toString();
                return e.substring(e.length - 2)
            }
        };
    return Object.keys(u).reduce((e, t) => 0 <= e.indexOf(t) ? e.replace(t, u[t]()) : e, format)
};

Date.prototype.timeDiff = (toms: number, format) => toms instanceof Date ? parseSymbols(toms.getTime(), this.getTime(), format) : parseSymbols(toms, this.getTime(), format)

Date.prototype.timeAgo = (fromms: number, symbols) => {
    const r = symbols
    var t = {
        "%s": "second",
        "%n": "minute",
        "%h": "hour",
        "%d": "day",
        "%m": "month",
        "%y": "year"
    },
        n = void 0;
    n = fromms instanceof Date ? parseSymbols(this.getTime(), fromms.getTime(), r.join("|")).split("|") : parseSymbols(this.getTime(), fromms, r.join("|")).split("|");
    var i = r.reduce((e, r, i) => {
        var o = parseInt(n[i]),
            s = r.toLowerCase();
        if (0 === o || void 0 === t[s]) return e;
        var a = e ? e + " " : "";
        return 1 === o ? a + n[i] + " " + t[s] : a + n[i] + " " + t[s] + "s"
    }, null);
    if (!i) {
        for (var o = Object.keys(t), s = 0; s < o.length; s++)
            if (r.includes(o[s]) || r.includes(o[s].toUpperCase())) {
                var a = r[r.indexOf(o[s])];
                return a || (a = r[r.indexOf(o[s].toUpperCase())]), parseSymbols(1, 1, a) + " " + t[o[s]] + "s ago"
            } return ""
    }
    return i + " ago"
};

Date.prototype.age = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date;
    if (t < this) return 0;
    var e = Math.abs(this.getFullYear() - t.getFullYear());
    return 0 < e && (e -= 1), t.getMonth() > this.getMonth() || t.getMonth() === this.getMonth() && t.getDate() >= this.getDate() ? e + 1 : e
};

Date.utc = Object.assign({}, {
    hr: () => new Date().getUTCHours(),
    date: () => new Date().getUTCDate(),
    month: () => new Date().getUTCMonth(),
    min: () => new Date().getUTCMinutes(),
    sec: () => new Date().getUTCSeconds(),
    year: () => new Date().getUTCFullYear(),
    millisec: () => new Date().getUTCMilliseconds()
});

Date.prototype.utc = Object.assign({}, {
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
});

export default Date;