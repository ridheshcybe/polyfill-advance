//@ts-ignore
Date.prototype.utc = {};
var props = {
    hr: function () { return (new Date).getUTCHours(); },
    date: function () { return (new Date).getUTCDate(); },
    month: function () { return (new Date).getUTCMonth(); },
    min: function () { return (new Date).getUTCMinutes(); },
    sec: function () { return (new Date).getUTCSeconds(); },
    year: function () { return (new Date).getUTCFullYear(); },
    millisec: function () { return (new Date).getUTCMilliseconds(); }
};
// @ts-ignore
for (var p in props)
    Object.defineProperty(Date.prototype.utc, p, { get: props[p] });
//# sourceMappingURL=date.js.map