"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require(".");
describe('check Object.*', function () {
    ['isArguments', 'keys', 'assign', 'is', 'setPrototypeOf', 'getPrototypeOf', 'getOwnPropertyNames', 'create', 'defineProperty', 'defineProperties', 'freeze'].forEach(function (e) {
        it("Defines " + e + "()", function () {
            expect(Object[e]).toBeDefined();
        });
    });
});
//# sourceMappingURL=Object.test.js.map