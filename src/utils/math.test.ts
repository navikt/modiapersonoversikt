import { roundToNearest20 } from './math';

test('runder av til nærmeste 20', () => {
    const numbers = [
        19,
        21,
        29,
        131,
        9.9999
    ];

    const roundedNumbers = numbers.map(n => roundToNearest20(n));

    const expected = [
        20,
        20,
        20,
        140,
        0
    ];

    expect(roundedNumbers).toEqual(expected);
});