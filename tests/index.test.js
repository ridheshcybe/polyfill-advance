it('import', () => import('../dist/index.js'));

it('test GlobalThis', () => {
    const maker = (str) => {
        const arr = str.split('-');
        arr.pop();
        return arr.join('-')
    }
    expect(globalThis.fileDate).toBeDefined();
    expect(maker(fileDate())).toBe(maker(globalThis.fileDate()));
})

describe('check prototypes', () => {
    it('promise', () => {
        const promise = new Promise(() => { });
        expect(promise.immediate).toBeDefined();
        expect(promise.timeOut).toBeDefined();
        expect(promise.then).toBeDefined();
        expect(promise.catch).toBeDefined();
    })
    it('Date', () => {
        const date = new Date();
        expect(date.utc.hr).toBeDefined();
        expect(date.utc.date).toBeDefined();
        expect(date.utc.month).toBeDefined();
        expect(date.utc.min).toBeDefined();
        expect(date.utc.sec).toBeDefined();
        expect(date.utc.year).toBeDefined();
        expect(date.utc.millisec).toBeDefined();
    })
})