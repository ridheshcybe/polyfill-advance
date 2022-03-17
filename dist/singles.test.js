"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var singles_1 = require("./singles");
it('FileDate check', function () {
    expect((0, singles_1.fileDate)()).toBeDefined();
    expect(typeof (0, singles_1.fileDate)()).toBe('string');
    expect((0, singles_1.fileDate)().includes('-')).toBeTruthy();
});
//# sourceMappingURL=singles.test.js.map