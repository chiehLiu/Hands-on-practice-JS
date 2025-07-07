const inRange = require('./inRange');

describe('inRange', () => {
  test('value inside normal range', () => {
    expect(inRange(3, 2, 4)).toBe(true);
  });

  test('value equal to upper bound (exclusive)', () => {
    expect(inRange(4, 2, 4)).toBe(false);
  });

  test('value equal to lower bound (inclusive)', () => {
    expect(inRange(2, 2, 4)).toBe(true);
  });

  test('reversed range boundaries', () => {
    expect(inRange(3, 4, 2)).toBe(true);
  });

  test('with two parameters (range from 0 to end)', () => {
    expect(inRange(3, 4)).toBe(true);
    expect(inRange(0, 4)).toBe(true);
    expect(inRange(4, 4)).toBe(false);
  });

  test('empty or invalid ranges', () => {
    expect(inRange(0, 0)).toBe(false);
    expect(inRange(0, 0, 0)).toBe(false);
  });
});
