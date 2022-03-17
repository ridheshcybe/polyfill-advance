import { fileDate } from './singles';

it('FileDate check', () => {
    expect(fileDate()).toBeDefined();
    expect(typeof fileDate()).toBe('string');
    expect(fileDate().includes('-')).toBeTruthy();
})