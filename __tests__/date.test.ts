//@ts-nocheck
import '../app/modules/Date';

const fn = (where) => () => {
    expect(where).toBeDefined();
    expect(where).toBeInstanceOf(Function);
}

describe('check Date.utc', () => {
    it('length Check', () => {
        expect(Object.keys(Date.utc).length).toBe(7);
    });

    it(`Defines Date.utc.hr();`, fn(Date.utc.hr));
    it(`Defines Date.utc.min()`, fn(Date.utc.min));
    it(`Defines Date.utc.sec()`, fn(Date.utc.sec));
    it(`Defines Date.utc.date()`, fn(Date.utc.date));
    it(`Defines Date.utc.year()`, fn(Date.utc.year));
    it(`Defines Date.utc.month()`, fn(Date.utc.month));
    it(`Defines Date.utc.millisec()`, fn(Date.utc.millisec));
})

describe('check dynamic', () => {
    const date = new Date();
    it('defines Date.format();', fn(date.format));
    it('defines Date.timeDiff();', fn(date.timeDiff));
})

describe('check Date.prototype.utc', () => {
    const date = new Date();
    it('length check', () => {
        expect(Object.keys(date.utc).length).toBe(7);
    });

    it(`Defines date.utc.hr();`, fn(date.utc.hr));
    it(`Defines date.utc.min()`, fn(date.utc.min));
    it(`Defines date.utc.sec()`, fn(date.utc.sec));
    it(`Defines date.utc.date()`, fn(date.utc.date));
    it(`Defines date.utc.year()`, fn(date.utc.year));
    it(`Defines date.utc.month()`, fn(date.utc.month));
    it(`Defines date.utc.millisec()`, fn(date.utc.millisec));
})