import promise from './promise';

function fileDate(utc = !1, native = !1) {
    const o = new Date;
    if (native) return o.toISOString();
    if (utc) return `${o.getUTCFullYear()}-${o.getUTCMonth() + 1}-${o.getUTCDate()}-${o.getUTCHours()}-${o.getUTCMinutes()}-${o.getUTCSeconds()}-${o.getUTCMilliseconds()}`;
    return `${o.getFullYear()}-${o.getMonth() + 1}-${o.getDate()}-${o.getHours()}-${o.getMinutes()}-${o.getSeconds()}-${o.getMilliseconds()}`
}

// @ts-ignore
Date.prototype.utc = {};

const props = {
    hr: () => (new Date).getUTCHours(),
    date: () => (new Date).getUTCDate(),
    month: () => (new Date).getUTCMonth(),
    min: () => (new Date).getUTCMinutes(),
    sec: () => (new Date).getUTCSeconds(),
    year: () => (new Date).getUTCFullYear(),
    millisec: () => (new Date).getUTCMilliseconds()
}

// @ts-ignore
for (const p in props) Object.defineProperty(Date.prototype.utc, p, { get: props[p] });

// @ts-ignore
globalThis.Promise = promise;
globalThis.fileDate = fileDate;