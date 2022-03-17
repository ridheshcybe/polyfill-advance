import promise from './promise';

describe("Promise", () => {
    describe('dynamic', () => {
        const p = new promise((r, j) => r());

        ['then', 'catch'].forEach(e => {
            it(`defines ${e}()`, () => {
                expect(p[e]).toBeDefined();
                expect(p[e]).toBeInstanceOf(Function);
            })
        });
    });

    describe('static', () => {
        ['timeOut', 'race', 'allSettled', 'immediate', 'resolve', 'reject'].forEach(e => {
            it(`defines ${e}()`, () => {
                expect(promise[e]).toBeDefined();
                expect(promise[e]).toBeInstanceOf(Function);
            })
        });
    })
});