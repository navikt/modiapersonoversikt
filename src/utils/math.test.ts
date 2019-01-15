import { roundToNearest50 } from './math';

test('runder av til nærmeste 20', () => {
    const numbers = [
        19,
        26,
        51,
        98,
        149.99999
    ];

    const roundedNumbers = numbers.map(n => roundToNearest50(n));

    const expected = [
        0,
        50,
        50,
        100,
        150
    ];

    expect(roundedNumbers).toEqual(expected);
});