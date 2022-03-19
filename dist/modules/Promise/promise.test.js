"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe("Promise", function () {
    describe('dynamic', function () {
        var p = new _1.default(function (r, j) { return r(void 0); });
        ['then', 'catch'].forEach(function (e) {
            it("defines " + e + "()", function () {
                expect(p[e]).toBeDefined();
                expect(p[e]).toBeInstanceOf(Function);
            });
        });
    });
    describe('static', function () {
        ['timeOut', 'race', 'allSettled', 'immediate', 'resolve', 'reject'].forEach(function (e) {
            it("defines " + e + "()", function () {
                expect(_1.default[e]).toBeDefined();
                expect(_1.default[e]).toBeInstanceOf(Function);
            });
        });
    });
});
//# sourceMappingURL=promise.test.js.map