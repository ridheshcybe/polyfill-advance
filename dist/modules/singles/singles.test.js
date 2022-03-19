"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
it('FileDate check', function () {
    expect(_1.fileDate()).toBeDefined();
    expect(typeof _1.fileDate()).toBe('string');
    expect(_1.fileDate().includes('-')).toBeTruthy();
});
//# sourceMappingURL=singles.test.js.map