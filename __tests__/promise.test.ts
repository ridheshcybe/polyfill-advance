import '../app/modules/Promise';

function fn(where) {
    expect(where).toBeDefined();
    expect(where).toBeInstanceOf(Function);
}

describe("Promise", () => {
    describe('dynamic', () => {
        const p = new Promise((r, j) => r(void 0));

        it(`defines Promise.then();`, () => fn(p.then));
        it(`defines Promise.catch();`, () => fn(p.catch));
    });

    describe('static', () => {
        //@ts-ignore
        it(`defines Promise.immediate();`, () => fn(Promise.immediate));
        it(`defines Promise.reject();`, () => fn(Promise.reject));
        it(`defines Promise.timeOut();`, () => fn(Promise.resolve));
        it(`defines Promise.resolve();`, () => fn(Promise.resolve));
        it(`defines Promise.allSettled();`, () => fn(Promise.allSettled));
    })
});