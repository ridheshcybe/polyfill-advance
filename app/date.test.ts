//@ts-nocheck
import './date';

['timeDiff', 'format'].forEach(method => {
    expect(Date.prototype[method]).toBeDefined();
});

describe('check Date.utc', () => {
    it('length Check', () => {
        expect(Object.keys(Date.utc).length).toBe(7);
    });

    ['hr', 'date', 'month', 'min', 'sec', 'year', 'millisec'].forEach(e => {
        it(`Defines ${e}()`, () => {
            expect(Date.utc[e]).toBeDefined();
            expect(Date.utc[e]).toBeInstanceOf(Function);
        })
    })
})

describe('check Date.prototype.utc', () => {
    const date = new Date();
    it('length check', () => {
        expect(Object.keys(date.utc).length).toBe(7);
    });

    ['hr', 'date', 'month', 'min', 'sec', 'year', 'millisec'].forEach(e => {
        it(`Defines ${e}()`, () => {
            expect(date.utc[e]).toBeDefined();
            expect(date.utc[e]).toBeInstanceOf(Function);
        })
    })
})