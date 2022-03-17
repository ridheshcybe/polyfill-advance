//@ts-ignore
Date.prototype.utc = {};

//@ts-ignore
Object.defineProperties(Date.prototype.utc, {
    hr: {
        get: () => new Date().getUTCHours()
    },
    min: {
        get: () => new Date().getUTCMinutes()
    },
    sec: {
        get: () => new Date().getUTCSeconds()
    },
    millisec: {
        get: () => new Date().getUTCMilliseconds()
    },
    date: {
        get: () => new Date().getUTCDate()
    },
    month: {
        get: () => new Date().getUTCMonth()
    }
});