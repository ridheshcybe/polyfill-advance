require('../dist/modules/singles');

const fileDate = globalThis.fileDate;

it('FileDate check', () => {
    expect(fileDate()).toBeDefined();
    expect(typeof fileDate()).toBe('string');
    expect(fileDate().includes('-')).toBeTruthy();
})