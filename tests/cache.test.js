/**
 * @jest-environment jsdom
 */
import dbhCache from "../src/cache";
import {afterEach, beforeEach, expect} from "@jest/globals";
// import {Jest as jest} from "@jest/environment";

beforeEach(() => {
    jest.useRealTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

// jest.useFakeTimers();

// jest.useFakeTimers();

test('set cookies', () => {
    dbhCache.setCookie('hello', 'world', 2);
    expect(dbhCache.getCookie('hello'))
        .toBe('world');
});
test('get expire cookies ', (done) => {
    setTimeout(() => {
        expect(dbhCache.getCookie('hello'))
            .not.toBe('world');
        expect(dbhCache.getCookie('hello'))
            .toBe('');
        done();
    }, 3000);
});

test('set lockr', () => {
    dbhCache.setBigDataValue('key', 'value', 2);
    expect(dbhCache.getBigDataValue('key'))
        .toBe('value');
});
test('get expire lockr ', (done) => {
    setTimeout(() => {
        expect(dbhCache.getBigDataValue('key'))
            .not.toBe('value');
        expect(dbhCache.getBigDataValue('key'))
            .toBe('');
        done();
    }, 3000);
});
