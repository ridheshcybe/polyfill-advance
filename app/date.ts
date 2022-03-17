//@ts-ignore
Date.prototype.format = function (format) {
    const self = this;

    const shorten = (s) => {
        var reversed = s.toString().split('').reverse().join('');
        return reversed.substr(reversed.length - 3).split('').reverse().join('');
    }

    const thf = (hr) => {
        var twelveHourFormat = hr % 12;
        return 0 === twelveHourFormat ? 12 : twelveHourFormat;
    }

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

    return Object.keys(formats).reduce((d, fKey) =>
        0 <= d.indexOf(fKey) ? d.replace(fKey, formats[fKey]()) : d
    , format);
}

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

export default Date;