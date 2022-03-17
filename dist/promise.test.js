"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promise_1 = require("./promise");
describe("Promise", function () {
    describe('dynamic', function () {
        var p = new promise_1.default(function (r, j) { return r(); });
        ['then', 'catch'].forEach(function (e) {
            it("defines ".concat(e, "()"), function () {
                expect(p[e]).toBeDefined();
                expect(p[e]).toBeInstanceOf(Function);
            });
        });
    });
    describe('static', function () {
        ['timeOut', 'race', 'allSettled', 'immediate', 'resolve', 'reject'].forEach(function (e) {
            it("defines ".concat(e, "()"), function () {
                expect(promise_1.default[e]).toBeDefined();
                expect(promise_1.default[e]).toBeInstanceOf(Function);
            });
        });
    });
});
//# sourceMappingURL=promise.test.js.map