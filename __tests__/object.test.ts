import "../app/modules/Object";

const fn = (where) => () => {
    expect(where).toBeDefined();
    expect(where).toBeInstanceOf(Function);
}

describe('check Object.*', () => {
    it(`Defines Object.is()`, fn(Object.is))
    it(`Defines Object.keys()`, fn(Object.keys))
    it(`Defines Object.create()`, fn(Object.create))
    it(`Defines Object.freeze()`, fn(Object.freeze))
    it(`Defines Object.assign()`, fn(Object.assign))
    //@ts-ignore
    it(`Defines Object.isArguments()`, fn(Object.isArguments))
    it(`Defines Object.getPrototypeOf()`, fn(Object.getPrototypeOf))
    it(`Defines Object.defineProperty()`, fn(Object.defineProperty))
    it(`Defines Object.setPrototypeOf()`, fn(Object.setPrototypeOf))
    it(`Defines Object.defineProperties()`, fn(Object.defineProperties))
    it(`Defines Object.getOwnPropertyNames()`, fn(Object.getOwnPropertyNames))
})