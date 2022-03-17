"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Date;
//# sourceMappingURL=date.js.map