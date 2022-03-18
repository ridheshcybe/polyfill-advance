function fileDate(native = !1, utc = !1) {
    const o = new Date;
    if (native) return o.toISOString();
    if (utc) return `${o.getUTCFullYear()}-${o.getUTCMonth() + 1}-${o.getUTCDate()}-${o.getUTCHours()}-${o.getUTCMinutes()}-${o.getUTCSeconds()}-${o.getUTCMilliseconds()}`;
    return `${o.getFullYear()}-${o.getMonth() + 1}-${o.getDate()}-${o.getHours()}-${o.getMinutes()}-${o.getSeconds()}-${o.getMilliseconds()}`
}

globalThis.fileDate = fileDate;

export { fileDate }