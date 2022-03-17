"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
require("./date");
describe('check Date.utc', function () {
    it('length Check', function () {
        expect(Object.keys(Date.utc).length).toBe(7);
    });
    ['hr', 'date', 'month', 'min', 'sec', 'year', 'millisec'].forEach(function (e) {
        it("Defines ".concat(e, "()"), function () {
            expect(Date.utc[e]).toBeDefined();
            expect(Date.utc[e]).toBeInstanceOf(Function);
        });
    });
});
describe('check Date.prototype.utc', function () {
    var date = new Date();
    it('length check', function () {
        expect(Object.keys(date.utc).length).toBe(7);
    });
    ['hr', 'date', 'month', 'min', 'sec', 'year', 'millisec'].forEach(function (e) {
        it("Defines ".concat(e, "()"), function () {
            expect(date.utc[e]).toBeDefined();
            expect(date.utc[e]).toBeInstanceOf(Function);
        });
    });
});
//# sourceMappingURL=date.test.js.map